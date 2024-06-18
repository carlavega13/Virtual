const bcrypt = require("bcryptjs");
const { User } = require("../../src/db");
const login = require("../../src/Controllers/UsersControllers/login");

jest.mock("../../src/db", () => ({
  User: {
    findOne: jest.fn(),
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

describe("login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user details if email and password are correct", async () => {
    const info = {
      email: "john@example.com",
      password: "password123",
    };

    const user = {
      id: 1,
      email: info.email,
      name: "John Doe",
      contact_details: "123456789",
      profile_picture: "http://example.com/profile.jpg",
      password: "hashedpassword",
      created_at: new Date(),
      update_at: new Date(),
    };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);

    const result = await login(info);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: info.email } });
    expect(bcrypt.compare).toHaveBeenCalledWith(info.password, user.password);
    expect(result).toEqual({
      id: user.id,
      email: user.email,
      name: user.name,
      contact_details: user.contact_details,
      profile_picture: user.profile_picture,
      created_at: user.created_at,
      update_at: user.update_at,
    });
  });

  it("should throw an error if the user does not exist", async () => {
    const info = {
      email: "john@example.com",
      password: "password123",
    };

    User.findOne.mockResolvedValue(null);

    await expect(login(info)).rejects.toThrow("There is no user with that credentials");

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: info.email } });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it("should throw an error if the password is incorrect", async () => {
    const info = {
      email: "john@example.com",
      password: "password123",
    };

    const user = {
      id: 1,
      email: info.email,
      name: "John Doe",
      contact_details: "123456789",
      profile_picture: "http://example.com/profile.jpg",
      password: "hashedpassword",
    };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);

    await expect(login(info)).rejects.toThrow("Password is incorrect");

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: info.email } });
    expect(bcrypt.compare).toHaveBeenCalledWith(info.password, user.password);
  });

  it("should throw an error if an unexpected error occurs", async () => {
    const info = {
      email: "john@example.com",
      password: "password123",
    };

    User.findOne.mockRejectedValue(new Error("Unexpected error"));

    await expect(login(info)).rejects.toThrow("Unexpected error");

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: info.email } });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });
});
