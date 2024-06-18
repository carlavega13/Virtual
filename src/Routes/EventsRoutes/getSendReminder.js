const sendEventReminder = require("../../utils/sendEventReminder");
const { User } = require("../../db");
const getSendReminder = async (req, res) => {
  try {
    const admin = await User.findOne({ where: { rol: "admin",id:req.params.id } });
    if(!admin){
      return res.status(404).json({ message: "You are not authorized to send reminders" });
    }
    await sendEventReminder(admin.email);
    res.status(200).json({ message: "Reminders sent" });
  } catch (error) {
    res.status(200).json({ message: "An error occurred", error: error.message });
  }
};

module.exports =  getSendReminder ;
