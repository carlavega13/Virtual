const { Event, User } = require("../../db");
const destroyEvent = async (info) => {
  try {
    const organizer = await User.findOne({
      where: { id: info.organizer_id, rol: "admin" },
    });
    if (!organizer) {
      throw Error("You dont have permission to create an event");
    }
    const event = await Event.destroy({
      where: { id: info.event_id, organizer_id: info.organizer_id },
    });
    return event;
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = destroyEvent;
