const purchaseTicket = require("../../Controllers/TicketsControllers/purchaseTicket")

const postTicket=async(req,res)=>{
try {
    const response=await purchaseTicket(req.body)
    res.status(200).json({message:"Ticket purchase ",response:response})
} catch (error) {
    res.status(400).json({message:"An error occurred while purchasing the ticket",error:error.message})
}
}
module.exports=postTicket