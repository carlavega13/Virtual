const sendEventReminder = require("../../utils/sendEventReminder");

const getSendReminder = async (req, res) => {
  try {
    await sendEventReminder();
    res.status(200).json({ message: "Reminders sent" });
  } catch (error) {
    res.status(200).json({ message: "An error occurred", error: error.message });
  }
};

module.exports =  getSendReminder ;
