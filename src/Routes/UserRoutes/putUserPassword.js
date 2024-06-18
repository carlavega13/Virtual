const changePassword=require("../../Controllers/UsersControllers/changePassword")
const putUserPassword=async(req,res)=>{
try {
    const response=await changePassword(req.body)
    res.status(200).json({response:response})
} catch (error) {
    res.status(400).json({error:"Error changing password",error:error.message})
}
}
module.exports=putUserPassword
