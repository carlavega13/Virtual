const { Sequelize } = require("sequelize");
const { User } = require("../../src/db");
const bcrypt = require("bcryptjs");
const changePassword = require("../../src/Controllers/UsersControllers/changePassword"); // Ajusta la ruta al archivo correcto

jest.mock("../../src/db", () => ({
  User: {
    findOne: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

describe("changePassword", () => {
  let currentTime;

  beforeEach(() => {
    jest.clearAllMocks();
    currentTime = Date.now();
    jest.spyOn(Date, 'now').mockImplementation(() => currentTime);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should change the user's password if the token is valid and not expired", async () => {
    const info = {
      email: "user@example.com",
      token: "validToken",
      password: "newPassword",
    };
    const userMock = {
      update: jest.fn(),
    };
    User.findOne.mockResolvedValue(userMock);
    bcrypt.hash.mockResolvedValue("hashedPassword");

    const result = await changePassword(info);

    expect(User.findOne).toHaveBeenCalledWith({
      where: {
        email: info.email,
        reset_password_token: info.token,
        reset_password_expires: { [Sequelize.Op.gt]: currentTime },
      },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(info.password, 10);
    expect(userMock.update).toHaveBeenCalledWith({
      password: "hashedPassword",
      reset_password_token: null,
      reset_password_expires: null,
    });
    expect(result).toBe("Password changed successfully");
  });

  it("should throw an error if the token is invalid or expired", async () => {
    const info = {
      email: "user@example.com",
      token: "expiredToken",
      password: "newPassword",
    };

    User.findOne.mockResolvedValue(null);

    await expect(changePassword(info)).rejects.toThrow("Invalid or expired reset token");

    expect(User.findOne).toHaveBeenCalledWith({
      where: {
        email: info.email,
        reset_password_token: info.token,
        reset_password_expires: { [Sequelize.Op.gt]: currentTime },
      },
    });
  });

  it("should throw an error if User.findOne fails", async () => {
    const info = {
      email: "user@example.com",
      token: "validToken",
      password: "newPassword",
    };

    User.findOne.mockRejectedValue(new Error("Database error"));

    await expect(changePassword(info)).rejects.toThrow("Database error");
  });

  it("should throw an error if bcrypt.hash fails", async () => {
    const info = {
      email: "user@example.com",
      token: "validToken",
      password: "newPassword",
    };
    const userMock = {
      update: jest.fn(),
    };
    User.findOne.mockResolvedValue(userMock);
    bcrypt.hash.mockRejectedValue(new Error("Hashing error"));

    await expect(changePassword(info)).rejects.toThrow("Hashing error");
  });
});