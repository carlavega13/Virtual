const createEvent = require("../../Controllers/EventsControllers/createEvent");
const postEvent = async (req, res) => {
  try {
    const response = await createEvent(req.body);
    res
      .status(200)
      .json({ message: "Evento creado exitosamente", response: response });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear el evento", error: error.message });
  }
};

module.exports = postEvent;
