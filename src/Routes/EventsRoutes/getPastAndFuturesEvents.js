const pastAndFutureEvents = require("../../Controllers/EventsControllers/pastAndFutureEvents")

const getPastAndFutureEvents=async(req,res)=>{
    try {
        const response=await pastAndFutureEvents(req.params)
       res.status(200).json({message:response}) 
    } catch (error) {
        res.status(400).json({message:"",error:error.message})
    }
}
module.exports=getPastAndFutureEvents