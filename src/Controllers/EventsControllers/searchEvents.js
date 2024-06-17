const { Op, where, fn, col, literal } = require("sequelize");
const { Event } = require("../../db");

const searchEvents = async ({ text }) => {
  try {
    const search = `%${text.toLowerCase()}%`;
    const whereClause = {
      [Op.or]: [
        where(fn("LOWER", col("title")), { [Op.like]: search }),
        where(fn("LOWER", col("description")), { [Op.like]: search }),
        where(literal(`TO_CHAR(date, 'YYYY-MM-DD')`), { [Op.like]: search }),
        where(fn("LOWER", col("location")), { [Op.like]: search }),
        where(literal(`LOWER(CAST("ticket_price" AS TEXT))`), {
          [Op.like]: search,
        }),
      ],
    };
    const events = await Event.findAll({ where: whereClause });
    return events;
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = searchEvents;
