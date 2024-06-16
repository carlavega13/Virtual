const { Event, Ticket } = require("../../db");
const crypto = require("crypto");
const postMailController=require("../sendGridControllers/postMailController")
const htmlTicketPurchased=require("../sendGridControllers/htmlTicketPurchased")

const purchaseTicket = async (info) => {
  try {
    const event = await Event.findOne({ where: { id: info.eventId } });
    if (event.available_tickets - info.numberOfTickets >= 0) {
      const promiseTickets = [];
      for (let i = 0; i < info.numberOfTickets; i++) {
        let ticket_code = crypto.randomBytes(4).toString("hex");
        promiseTickets.push(
          Ticket.create({
            ticket_price: event.ticket_price,
            ticket_code: ticket_code,
            user_id: info.userId,
            event_id: event.id,
          })
        );
        let text=htmlTicketPurchased({title:event.title,ticket_code:ticket_code,date:event.date})
      promiseTickets.push( await postMailController({text,to:info.email,subject:"You have purchase a ticket!"}))
      }
     let tickets = await Promise.all(promiseTickets);
      await event.update({
        available_tickets: event.available_tickets - info.numberOfTickets,
      });

      return tickets.filter(t=>!t[0]);
    } else {
      throw Error("There is not enougth tickets to purchase");
    }
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = purchaseTicket;
