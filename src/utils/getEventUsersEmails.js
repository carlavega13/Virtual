const { Ticket, User } = require("../db");
const { fn, col, Op } = require("sequelize");
const getEventUsersEmails = async (eventId) => {
  try {
    let usersId = await Ticket.findAll({
      where: {
        event_id: eventId,
      },
      attributes: [[fn("DISTINCT", col("user_id")), "user_id"]],
    });
    usersId = usersId.map((e) => e.user_id);
    let usersEmail = await User.findAll({
      where: {
        id: {
          [Op.in]: usersId,
        },
      },
      attributes: ["email"],
    });
    usersEmail = usersEmail.map((e) => e.email);
    return usersEmail;
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = getEventUsersEmails;
