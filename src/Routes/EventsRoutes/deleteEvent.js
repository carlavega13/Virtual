const destroyEvent = require("../../Controllers/EventsControllers/destroyEvent");

const deleteEvent = async (req, res) => {
  try {
    const response = await destroyEvent(req.body);
    if (!response) {
      throw Error("Could not find the event");
    }
    res.status(200).json({ message: "Event was successfully deleted" });
  } catch (error) {
    res
      .status(200)
      .json({ message: "An error has occurred", error: error.message });
  }
};
module.exports = deleteEvent;
