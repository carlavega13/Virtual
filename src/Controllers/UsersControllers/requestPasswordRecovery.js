const {User}=require("../../db")
const crypto = require('crypto');
const htmlSendRecoveryCode = require("../sendGridControllers/htmlSendRecoveryCode");
const postMailController = require("../sendGridControllers/postMailController");
const requestPasswordRecovery=async(email)=>{
try {
    const user=await User.findOne({where:{email:email}})
    if(!user){
        throw Error("User not found")
    }
    const resetToken = crypto.randomBytes(4).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; 
    await User.update({reset_password_token:resetToken,reset_password_expires:resetTokenExpiry},{where:{email:email}})
const html=htmlSendRecoveryCode(resetToken)
await postMailController({subject:"Recover your password.",text:html,to:email})

    return "The code has been send"
} catch (error) {
    throw Error(error.message)
}
}
module.exports=requestPasswordRecovery


