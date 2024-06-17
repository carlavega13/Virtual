const { Event, User } = require("../../src/db");
const editEvent = require("../../src/Controllers/EventsControllers/editEvent");

jest.mock("../../src/db", () => ({
  Event: {
    findOne: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
  },
}));

describe("editEvent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should edit an event when organizer is admin and event exists", async () => {
    const eventData = {
      eventId: 1,
      organizerId: 1,
      title: "New Event Title",
      description: "New Event Description",
      date: "2023-12-31",
      time: "18:00",
      location: "New Location",
      ticket_price: 50,
      available_tickets: 100,
    };

    User.findOne.mockResolvedValue({ id: 1, rol: "admin" });
    const eventMock = {
      update: jest.fn(),
    };
    Event.findOne.mockResolvedValue(eventMock);

    const result = await editEvent(eventData);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { id: eventData.organizerId, rol: "admin" },
    });
    expect(Event.findOne).toHaveBeenCalledWith({
      where: { id: eventData.eventId, organizer_id: eventData.organizerId },
    });
    expect(eventMock.update).toHaveBeenCalledWith({
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      ticket_price: eventData.ticket_price,
      available_tickets: eventData.available_tickets,
    });
    expect(result).toBe(eventMock);
  });

  it("should throw an error if user is not an admin", async () => {
    const eventData = {
      eventId: 1,
      organizerId: 1,
      title: "New Event Title",
      description: "New Event Description",
      date: "2023-12-31",
      time: "18:00",
      location: "New Location",
      ticket_price: 50,
      available_tickets: 100,
    };

    User.findOne.mockResolvedValue(null);

    await expect(editEvent(eventData)).rejects.toThrow(
      "You dont have permission to edit an event"
    );
  });

  it("should throw an error if Event.findOne fails", async () => {
    const eventData = {
      eventId: 1,
      organizerId: 1,
      title: "New Event Title",
      description: "New Event Description",
      date: "2023-12-31",
      time: "18:00",
      location: "New Location",
      ticket_price: 50,
      available_tickets: 100,
    };

    User.findOne.mockResolvedValue({ id: 1, rol: "admin" });
    Event.findOne.mockRejectedValue(new Error("Database error"));

    await expect(editEvent(eventData)).rejects.toThrow("Database error");
  });

  it("should throw an error if event does not exist", async () => {
    const eventData = {
      eventId: 1,
      organizerId: 1,
      title: "New Event Title",
      description: "New Event Description",
      date: "2023-12-31",
      time: "18:00",
      location: "New Location",
      ticket_price: 50,
      available_tickets: 100,
    };

    User.findOne.mockResolvedValue({ id: 1, rol: "admin" });
    Event.findOne.mockResolvedValue(null);

    await expect(editEvent(eventData)).rejects.toThrow("Event not found");
  });
});
