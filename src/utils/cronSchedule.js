const cron = require("node-cron");
const sendReminderEmails = require("../utils/sendEventRemainder");

cron.schedule("50 13 * * *", () => {
  sendReminderEmails();
});
