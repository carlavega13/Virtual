const { User } = require("../../db");
const validateDataUser = require("../../utils/validateDataUser");
const bcrypt = require("bcryptjs");

const createUser = async (user) => {
  try {
    validateDataUser(user);
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) {
      throw new Error("User already exists");
    }
    await User.create({ ...user, rol: "user",  password: await bcrypt.hash(user.password, 10) });
    return "User created successfully";
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = createUser;
