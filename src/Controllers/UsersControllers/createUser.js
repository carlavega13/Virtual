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
    const password = await bcrypt.hash(user.password, 10);
    const userCreated = await User.create({ ...user, password });
    return {
      ...userCreated.dataValues,
      password: null,
      reset_password_token: null,
      reset_password_expires: null,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = createUser;
