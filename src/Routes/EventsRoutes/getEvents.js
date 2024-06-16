const userAllEvents = require("../../Controllers/EventsControllers/userAllEvents")

const getEvents=async(req,res)=>{
try {
    const response=await userAllEvents(req.params)
    res.status(200).json({data:response})
} catch (error) {
    res.status(200).json({error:"Events could not be brought",error:error.message})
}
}
module.exports=getEvents