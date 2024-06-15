const requestPasswordRecovery = require("../../Controllers/UsersControllers/requestPasswordRecovery")

const postRequestPasswordReset=async(req,res)=>{
try {
    const response=await requestPasswordRecovery(req.params.email)
    res.status(200).json(response)
} catch (error) {
    res.status(400).json(error.message)
}
}
module.exports=postRequestPasswordReset

