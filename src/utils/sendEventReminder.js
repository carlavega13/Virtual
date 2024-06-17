const { Event } = require("../db");
const { Op } = require("sequelize");
const getEventUsersEmails = require("./getEventUsersEmails");
const htmlComingEvent = require("../Controllers/sendGridControllers/htmlComingEvent");
const postMailController = require("../Controllers/sendGridControllers/postMailController");

const sendEventReminder = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const events = await Event.findAll({
    where: {
      date: tomorrow,
    },
  });
  let arrayUsersEmails = [];
  for (let i = 0; i < events.length; i++) {
    arrayUsersEmails.push(getEventUsersEmails(events[i].id));
  }
  arrayUsersEmails = await Promise.all(arrayUsersEmails);
  const mailsPromises = [];
  for (let e = 0; e < events.length; e++) {
    let to = arrayUsersEmails[e];
    let subject = "Event Remainder.";
    let text = htmlComingEvent({
      title: events[e].title,
      date: events[e].date,
    });
    mailsPromises.push(postMailController({ to, subject, text }));
  }

  await Promise.all(mailsPromises);
  return;
};

module.exports = sendEventReminder;
