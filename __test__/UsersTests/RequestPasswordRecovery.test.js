const crypto = require("crypto");
const { User } = require("../../src/db");
const htmlSendRecoveryCode = require("../../src/Controllers/sendGridControllers/htmlSendRecoveryCode");
const postMailController = require("../../src/Controllers/sendGridControllers/postMailController");
const requestPasswordRecovery = require("../../src/Controllers/UsersControllers/requestPasswordRecovery");

jest.mock("../../src/db", () => ({
  User: {
    findOne: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock("crypto", () => ({
  randomBytes: jest.fn(),
}));

jest.mock(
  "../../src/Controllers/sendGridControllers/htmlSendRecoveryCode",
  () => jest.fn()
);
jest.mock("../../src/Controllers/sendGridControllers/postMailController", () =>
  jest.fn()
);

describe("requestPasswordRecovery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send a recovery email if the user is found", async () => {
    const email = "john@example.com";
    const user = { id: 1, email: email };
    const resetToken = "12345678";
    const resetTokenBuffer = Buffer.from(resetToken, "utf-8");
    const resetTokenHex = resetTokenBuffer.toString("hex");
    const resetTokenExpiry = Date.now() + 3600000;
    const html = "<html>Recovery Code</html>";

    User.findOne.mockResolvedValue(user);
    crypto.randomBytes.mockReturnValue(resetTokenBuffer);
    htmlSendRecoveryCode.mockReturnValue(html);
    postMailController.mockResolvedValue("Email sent");

    const result = await requestPasswordRecovery(email);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: email } });
    expect(User.update).toHaveBeenCalledWith(
      {
        reset_password_token: resetTokenHex,
        reset_password_expires: resetTokenExpiry,
      },
      { where: { email: email } }
    );
    expect(htmlSendRecoveryCode).toHaveBeenCalledWith(resetTokenHex);
    expect(postMailController).toHaveBeenCalledWith({
      subject: "Recover your password.",
      text: html,
      to: email,
    });
    expect(result).toBe("The code has been send");
  });

  it("should throw an error if the user is not found", async () => {
    const email = "john@example.com";

    User.findOne.mockResolvedValue(null);

    await expect(requestPasswordRecovery(email)).rejects.toThrow(
      "User not found"
    );

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: email } });
    expect(User.update).not.toHaveBeenCalled();
    expect(htmlSendRecoveryCode).not.toHaveBeenCalled();
    expect(postMailController).not.toHaveBeenCalled();
  });

  it("should throw an error if an unexpected error occurs", async () => {
    const email = "john@example.com";

    User.findOne.mockRejectedValue(new Error("Unexpected error"));

    await expect(requestPasswordRecovery(email)).rejects.toThrow(
      "Unexpected error"
    );

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: email } });
    expect(User.update).not.toHaveBeenCalled();
    expect(htmlSendRecoveryCode).not.toHaveBeenCalled();
    expect(postMailController).not.toHaveBeenCalled();
  });
});
