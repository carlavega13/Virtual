const { Event } = require("../../db");
const userAllEvents = async ({ eventId }) => {
  try {
    const events = await Event.findAll({ where: { organizer_id: eventId } });
    return events;
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = userAllEvents;
