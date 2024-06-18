const { Event, Ticket } = require("../../db");
const crypto = require("crypto");
const postMailController = require("../sendGridControllers/postMailController");
const htmlTicketPurchased = require("../sendGridControllers/htmlTicketPurchased");

const purchaseTicket = async (info) => {
  try {
    const event = await Event.findOne({ where: { id: info.eventId } });
    if (event.available_tickets - info.numberOfTickets >= 0) {
      const promiseTickets = [];
      const promiseEmails = [];
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
        let text = htmlTicketPurchased({
          title: event.title,
          ticket_code: ticket_code,
          date: event.date,
        });
        promiseEmails.push(
          postMailController({
            text,
            to: info.email,
            subject: "You have purchased a ticket!",
          })
        );
      }
      const tickets = await Promise.all(promiseTickets);
      await Promise.all(promiseEmails);
      await event.update({
        available_tickets: event.available_tickets - info.numberOfTickets,
      });
      return tickets;
    } else {
      throw Error("There is not enougth tickets to purchase");
    }
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = purchaseTicket;
