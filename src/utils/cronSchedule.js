const cron = require('node-cron');
const sendReminderEmails = require('../utils/sendEventRemainder');

// Programar el envío de recordatorios para ejecutarse a las 9:00 AM cada día
cron.schedule('50 13 * * *', () => { 
  sendReminderEmails();
});