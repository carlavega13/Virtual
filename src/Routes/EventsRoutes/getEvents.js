const userAllEvents = require("../../Controllers/EventsControllers/userAllEvents")

const getEvents=async(req,res)=>{
try {
    const response=await userAllEvents(req.params)
    res.status(200).json({data:response.length==0?"No events found":response})
} catch (error) {
    res.status(400).json({error:"Events could not be brought",error:error.message})
}
}
module.exports=getEvents