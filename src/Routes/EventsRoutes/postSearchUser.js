const searchEvents = require("../../Controllers/EventsControllers/searchEvents")

const postSearchUser=async(req,res)=>{
try {
    const response=await searchEvents(req.body)
    res.status(200).json({data:response})
} catch (error) {
    res.status(200).json({message:"Error searching events",error:error.message})
}
}
module.exports=postSearchUser