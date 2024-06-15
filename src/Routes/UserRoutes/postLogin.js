const login = require("../../Controllers/UsersControllers/login");

const postLogin = async (req, res) => {
  try {
    const response = await login(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = postLogin;
