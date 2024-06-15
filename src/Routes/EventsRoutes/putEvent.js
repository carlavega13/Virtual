const editEvent = require("../../Controllers/EventsControllers/editEvent")

const putEvent=async(req,res)=>{
try {
    const response=await editEvent(req.body)
        res.status(200).json({message:"Event updated",response:response})
} catch (error) {
    res.status(400).json({message:"There was an error updating the event",error:error.message})
}
}

module.exports=putEvent

