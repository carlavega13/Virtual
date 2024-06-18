const { User } = require("../../src/db");
const validateDataUser = require("../../src/utils/validateDataUser");
const bcrypt = require("bcryptjs");
const createUser = require("../../src/Controllers/UsersControllers/createUser"); // Ajusta la ruta al archivo correcto

jest.mock("../../src/db", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("../../src/utils/validateDataUser");
jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

describe("createUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user if the data is valid and the user does not already exist", async () => {
    const user = {
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
    };

    validateDataUser.mockReturnValue(true);
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    User.create.mockResolvedValue(true);

    const result = await createUser(user);

    expect(validateDataUser).toHaveBeenCalledWith(user);
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: user.email } });
    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
    expect(User.create).toHaveBeenCalledWith({
      ...user,
      password: "hashedPassword",
    });
    expect(result).toBe("User created successfully");
  });

  it("should throw an error if the user already exists", async () => {
    const user = {
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
    };

    validateDataUser.mockReturnValue(true);
    User.findOne.mockResolvedValue(user);

    await expect(createUser(user)).rejects.toThrow("User already exists");

    expect(validateDataUser).toHaveBeenCalledWith(user);
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: user.email } });
  });

  it("should throw an error if validateDataUser throws an error", async () => {
    const user = {
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
    };

    validateDataUser.mockImplementation(() => {
      throw new Error("Invalid data");
    });

    await expect(createUser(user)).rejects.toThrow("Invalid data");

    expect(validateDataUser).toHaveBeenCalledWith(user);
    expect(User.findOne).not.toHaveBeenCalled();
  });

  it("should throw an error if bcrypt.hash fails", async () => {
    const user = {
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
    };

    validateDataUser.mockReturnValue(true);
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockRejectedValue(new Error("Hashing error"));

    await expect(createUser(user)).rejects.toThrow("Hashing error");

    expect(validateDataUser).toHaveBeenCalledWith(user);
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: user.email } });
    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
  });

  it("should throw an error if User.create fails", async () => {
    const user = {
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
    };

    validateDataUser.mockReturnValue(true);
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    User.create.mockRejectedValue(new Error("Database error"));

    await expect(createUser(user)).rejects.toThrow("Database error");

    expect(validateDataUser).toHaveBeenCalledWith(user);
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: user.email } });
    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
    expect(User.create).toHaveBeenCalledWith({
      ...user,
      password: "hashedPassword",
    });
  });
});
