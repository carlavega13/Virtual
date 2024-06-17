const pastAndFutureEvents = require("../../Controllers/EventsControllers/pastAndFutureEvents")

const getPastAndFutureEvents=async(req,res)=>{
    try {
        const response=await pastAndFutureEvents(req.params)
       res.status(200).json({data:response}) 
    } catch (error) {
        res.status(400).json({message:"An error occurred while fetching past and future events",error:error.message})
    }
}
module.exports=getPastAndFutureEvents