const editUser = require("../../Controllers/UsersControllers/editUser");

const putEditUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await editUser(id, req.body);
    res.status(200).json({ response: response });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

module.exports = putEditUser;
