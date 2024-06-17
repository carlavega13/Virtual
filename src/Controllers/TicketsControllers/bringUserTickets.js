const {Ticket}=require("../../db")
const bringUserTickets=async({id})=>{
try {
    const tickets=await Ticket.findAll({where:{user_id:id}})
    return tickets
} catch (error) {
    throw Error(error.message)
}
}
module.exports=bringUserTickets