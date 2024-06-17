const { Event, User } = require("../../db");
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
    const organizer = await User.findOne({
      where: { id: organizerId, rol: "admin" },
    });
    if (!organizer) {
      throw Error("You dont have permission to edit an event");
    }
    const event = await Event.findOne({
      where: { id: eventId, organizer_id: organizerId },
    });
    if (!event) {
      throw Error("Event not found");
    }
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
