const editUser = require("../../Controllers/UsersControllers/editUser");

const putEditUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await editUser(id, req.body);
    res
      .status(200)
      .json({ message: "User has been updated", response: response });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

module.exports = putEditUser;
