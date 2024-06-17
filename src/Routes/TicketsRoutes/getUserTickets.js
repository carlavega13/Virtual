const bringUserTickets = require("../../Controllers/TicketsControllers/bringUserTickets")


const getUserTickets=async(req,res)=>{
try {
    const response=await bringUserTickets(req.params)
    res.status(200).json({data:response})
} catch (error) {
    res.status(400).json({message:"Could not get tickets",error:error.message})
}
}
module.exports=getUserTickets