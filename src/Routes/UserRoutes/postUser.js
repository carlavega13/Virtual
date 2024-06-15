const createUser = require("../../Controllers/UsersControllers/createUser")
const {User}=require("../../db")
const postUser=async(req,res)=>{
try {
    const response=await createUser(req.body)
    res.status(200).json({response:response})
} catch (error) {
    res.status(400).json(error.message)
}

}
module.exports=postUser