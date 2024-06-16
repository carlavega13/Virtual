const { Event } = require("../../db");
const destroyEvent = async (info) => {
  try {
    const event = await Event.destroy({
      where: { id: info.event_id, organizer_id: info.organizer_id },
    });
    return event;
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = destroyEvent;
