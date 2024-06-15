const validateDataUser = require("../../utils/validateDataUser");
const { User } = require("../../db");
const editUser = async (id, info) => {
  try {
    let { name, profilePicture, contactDetails } = info;
    const user = await User.findByPk(id);
    name=name.split(" ").map(e=>`${e[0].toUpperCase()}${e.slice(1)}`).join(" ")
    validateDataUser({ ...info, email: user.email });
    const response = await user.update({
      contact_details: contactDetails,
      profile_picture: profilePicture,
      name: name,
    });
    return response;
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = editUser;
