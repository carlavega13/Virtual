const createUser = require("../../Controllers/UsersControllers/createUser");
const { User } = require("../../db");
const postUser = async (req, res) => {
  try {
    const response = await createUser(req.body);
    res
      .status(200)
      .json({ message: "User created successfully", response: response });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};
module.exports = postUser;
