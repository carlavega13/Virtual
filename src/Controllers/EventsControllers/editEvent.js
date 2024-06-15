const { Event } = require("../../db");
const editEvent = async (info) => {
  try {
    const {
      eventId,
      organizerId,
      title,
      description,
      date,
      time,
      location,
      ticket_price,
      available_tickets,
    } = info;
    const event = await Event.findOne({
      where: { id: eventId, organizer_id: organizerId },
    });
    await event.update({
      title,
      description,
      date,
      time,
      location,
      ticket_price,
      available_tickets,
    });
    return event;
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = editEvent;
