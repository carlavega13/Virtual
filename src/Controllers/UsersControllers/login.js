const {User}=require("../../db")
const bcrypt = require("bcryptjs");
const login=async(info)=>{
    try {
        const user = await User.findOne({ where: { email:info.email } });
        if(!user){
            throw Error("There is no user with that credentials")
        }
        if (await bcrypt.compare(info.password, user.password)) {
            return {
                id:user.id,
                email:user.email,
                name:user.name,
                contact_details:user.contact_details,
                profile_picture:user.profile_picture,
                created_at:user.created_at,
                update_at:user.update_at
              }
          }else{
            throw Error("Password is incorrect")
          }
    } catch (error) {
        throw Error(error.message)
    }
}
module.exports=login

