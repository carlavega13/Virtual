const { Event, User } = require("../../db");

const createEvent = async (info) => {
  try {
    const {
      organizerId,
      title,
      description,
      date,
      time,
      location,
      ticket_price,
      available_tickets,
    } = info;
    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !ticket_price ||
      !available_tickets
    ) {
      throw Error("All fields are required");
    }
    const organizer = await User.findOne({
      where: { id: organizerId, rol: "admin" },
    });
    if (!organizer) {
      throw Error("You dont have permission to create an event");
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      time,
      location,
      ticket_price,
      available_tickets,
      organizer_id: organizerId,
    });

    return newEvent;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = createEvent;
