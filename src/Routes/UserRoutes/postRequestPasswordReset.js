const requestPasswordRecovery = require("../../Controllers/UsersControllers/requestPasswordRecovery")

const postRequestPasswordReset=async(req,res)=>{
try {
    const response=await requestPasswordRecovery(req.params.email)
    res.status(200).json({message:"Password reset request sent",response:response})
} catch (error) {
    res.status(400).json({message:"Error sending password reset request",error:error.message})
}
}
module.exports=postRequestPasswordReset

