const { Sequelize } = require("sequelize");
const {User}=require("../../db")
const bcrypt=require("bcryptjs")

const changePassword = async (info) => {
  try {
        const user = await User.findOne({
          where: {
            email:info.email,
            reset_password_token: info.token,
           reset_password_expires: { [Sequelize.Op.gt]: Date.now() },
          }
        });
        if (!user) {
         throw Error("Invalid or expired reset token")
        }
    
    
        const hashedPassword = await bcrypt.hash(info.password, 10);
        await user.update({password:hashedPassword,reset_password_token:null,reset_password_expires:null})

    return "Password changed successfully"
  } catch (error) {
    throw Error(error.message)
  }
};

module.exports = changePassword;
