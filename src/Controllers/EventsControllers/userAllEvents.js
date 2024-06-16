const{ Event}=require("../../db")
const userAllEvents=async({eventId})=>{
try {
    const events =await Event.findAll({where:{organizer_id:eventId}})
    return events
} catch (error) {
    console.log(error.message);
    throw Error(error.message)
}
}
module.exports=userAllEvents