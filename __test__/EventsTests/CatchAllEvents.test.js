const { Event } = require("../../src/db");
const userAllEvents = require("../../src/Controllers/EventsControllers/userAllEvents"); 

jest.mock("../../src/db", () => ({
  Event: {
    findAll: jest.fn(),
  },
}));

describe("userAllEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return events for the given organizer id", async () => {
    const organizerId = 1;
    const eventsMock = [
      { id: 1, title: "Event 1", organizer_id: organizerId },
      { id: 2, title: "Event 2", organizer_id: organizerId },
    ];

    Event.findAll.mockResolvedValue(eventsMock);

    const result = await userAllEvents({ eventId: organizerId });

    expect(Event.findAll).toHaveBeenCalledWith({
      where: { organizer_id: organizerId },
    });

    expect(result).toEqual(eventsMock);
  });

  it("should return an empty array if no events are found for the given organizer id", async () => {
    const organizerId = 2;

    Event.findAll.mockResolvedValue([]);

    const result = await userAllEvents({ eventId: organizerId });

    expect(Event.findAll).toHaveBeenCalledWith({
      where: { organizer_id: organizerId },
    });

    expect(result).toEqual([]);
  });

  it("should throw an error if Event.findAll fails", async () => {
    const organizerId = 1;

    Event.findAll.mockRejectedValue(new Error("Database error"));

    await expect(userAllEvents({ eventId: organizerId })).rejects.toThrow("Database error");
  });
});
