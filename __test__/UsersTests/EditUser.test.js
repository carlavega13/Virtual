const validateDataUser = require("../../src/utils/validateDataUser");
const { User } = require("../../src/db");
const editUser = require("../../src/Controllers/UsersControllers/editUser");

jest.mock("../../src/db", () => ({
  User: {
    findByPk: jest.fn(),
  },
}));

jest.mock("../../src/utils/validateDataUser");

describe("editUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the user details if the user exists and data is valid", async () => {
    const id = 1;
    const info = {
      name: "john doe",
      profilePicture: "http://example.com/profile.jpg",
      contactDetails: "123456789",
    };

    const user = {
      id,
      email: "john@example.com",
      update: jest.fn().mockResolvedValue(true),
    };

    User.findByPk.mockResolvedValue(user);
    validateDataUser.mockReturnValue(true);

    const result = await editUser(id, info);

    expect(User.findByPk).toHaveBeenCalledWith(id);
    expect(validateDataUser).toHaveBeenCalledWith({ ...info, email: user.email });
    expect(user.update).toHaveBeenCalledWith({
      contact_details: info.contactDetails,
      profile_picture: info.profilePicture,
      name: "John Doe",
    });
    expect(result).toBe(true);
  });

  it("should throw an error if the user does not exist", async () => {
    const id = 1;
    const info = {
      name: "john doe",
      profilePicture: "http://example.com/profile.jpg",
      contactDetails: "123456789",
    };

    User.findByPk.mockResolvedValue(null);

    await expect(editUser(id, info)).rejects.toThrow("User not found");

    expect(User.findByPk).toHaveBeenCalledWith(id);
    expect(validateDataUser).not.toHaveBeenCalled();
  });

  it("should throw an error if validateDataUser throws an error", async () => {
    const id = 1;
    const info = {
      name: "john doe",
      profilePicture: "http://example.com/profile.jpg",
      contactDetails: "123456789",
    };

    const user = {
      id,
      email: "john@example.com",
      update: jest.fn(),
    };

    User.findByPk.mockResolvedValue(user);
    validateDataUser.mockImplementation(() => {
      throw new Error("Invalid data");
    });

    await expect(editUser(id, info)).rejects.toThrow("Invalid data");

    expect(User.findByPk).toHaveBeenCalledWith(id);
    expect(validateDataUser).toHaveBeenCalledWith({ ...info, email: user.email });
    expect(user.update).not.toHaveBeenCalled();
  });

  it("should throw an error if user.update fails", async () => {
    const id = 1;
    const info = {
      name: "john doe",
      profilePicture: "http://example.com/profile.jpg",
      contactDetails: "123456789",
    };

    const user = {
      id,
      email: "john@example.com",
      update: jest.fn().mockRejectedValue(new Error("Database error")),
    };

    User.findByPk.mockResolvedValue(user);
    validateDataUser.mockReturnValue(true);

    await expect(editUser(id, info)).rejects.toThrow("Database error");

    expect(User.findByPk).toHaveBeenCalledWith(id);
    expect(validateDataUser).toHaveBeenCalledWith({ ...info, email: user.email });
    expect(user.update).toHaveBeenCalledWith({
      contact_details: info.contactDetails,
      profile_picture: info.profilePicture,
      name: "John Doe",
    });
  });
});
