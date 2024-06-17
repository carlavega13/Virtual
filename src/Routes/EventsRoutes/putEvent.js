const editEvent = require("../../Controllers/EventsControllers/editEvent");
const htmlEventUpdated = require("../../Controllers/sendGridControllers/htmlEventUpdated");
const postMailController = require("../../Controllers/sendGridControllers/postMailController");
const getEventUsers = require("../../utils/getEventUsersEmails");

const putEvent = async (req, res) => {
  try {
    const response = await editEvent(req.body);
    const usersEmails = await getEventUsers(response.id);
    await postMailController({
      subject: "Event updated",
      to: usersEmails,
      text: htmlEventUpdated({ title: response.title, date: response.date }),
    });
    res.status(200).json({ message: "Event updated", response: response });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "There was an error updating the event",
        error: error.message,
      });
  }
};

module.exports = putEvent;
