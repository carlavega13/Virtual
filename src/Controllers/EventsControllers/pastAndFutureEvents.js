const { fn, col, Op } = require("sequelize");
const { Event, Ticket } = require("../../db");

const pastAndFutureEvents = async ({ id }) => {
  try {
    let eventsId = await Ticket.findAll({
      where: {
        user_id: id,
      },
      attributes: [[fn("DISTINCT", col("event_id")), "event_id"]],
    });
    eventsId = eventsId.map((e) => e.event_id);

    let pastEvents = await Event.findAll({
      where: {
        id: {
          [Op.in]: eventsId,
        },
        date: { [Op.lt]: new Date() },
      },
    });

    let futureEvents = await Event.findAll({
      where: {
        id: {
          [Op.in]: eventsId,
        },
        date: { [Op.gt]: new Date() },
      },
    });

    return {
      pastEvents,
      futureEvents,
    };
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = pastAndFutureEvents;
