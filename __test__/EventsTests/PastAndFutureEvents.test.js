const { fn, col, Op } = require("sequelize");
const { Event, Ticket } = require("../../src/db");
const pastAndFutureEvents = require("../../src/Controllers/EventsControllers/pastAndFutureEvents");

jest.mock("../../src/db", () => ({
  Event: {
    findAll: jest.fn(),
  },
  Ticket: {
    findAll: jest.fn(),
  },
}));

describe("pastAndFutureEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return past and future events for a user", async () => {
    const userId = 1;
    const eventIds = [1, 2, 3];
    const pastEventsMock = [{ id: 1, date: new Date("2023-01-01") }];
    const futureEventsMock = [{ id: 2, date: new Date("2025-01-01") }];

    Ticket.findAll.mockResolvedValue(eventIds.map((id) => ({ event_id: id })));
    Event.findAll.mockImplementation((options) => {
      if (options.where.date[Op.lt]) {
        return pastEventsMock;
      }
      if (options.where.date[Op.gt]) {
        return futureEventsMock;
      }
      return [];
    });

    const result = await pastAndFutureEvents({ id: userId });

    expect(Ticket.findAll).toHaveBeenCalledWith({
      where: { user_id: userId },
      attributes: [[fn("DISTINCT", col("event_id")), "event_id"]],
    });
    expect(Event.findAll).toHaveBeenCalledWith({
      where: {
        id: { [Op.in]: eventIds },
        date: { [Op.lt]: expect.any(Date) },
      },
    });
    expect(Event.findAll).toHaveBeenCalledWith({
      where: {
        id: { [Op.in]: eventIds },
        date: { [Op.gt]: expect.any(Date) },
      },
    });

    expect(result).toEqual({
      pastEvents: pastEventsMock,
      futureEvents: futureEventsMock,
    });
  });

  it("should throw an error if Ticket.findAll fails", async () => {
    const userId = 1;
    Ticket.findAll.mockRejectedValue(new Error("Database error"));

    await expect(pastAndFutureEvents({ id: userId })).rejects.toThrow(
      "Database error"
    );
  });

  it("should throw an error if Event.findAll fails for past events", async () => {
    const userId = 1;
    Ticket.findAll.mockResolvedValue([{ event_id: 1 }]);
    Event.findAll.mockRejectedValueOnce(new Error("Database error"));

    await expect(pastAndFutureEvents({ id: userId })).rejects.toThrow(
      "Database error"
    );
  });

  it("should throw an error if Event.findAll fails for future events", async () => {
    const userId = 1;
    Ticket.findAll.mockResolvedValue([{ event_id: 1 }]);
    Event.findAll
      .mockResolvedValueOnce([{ id: 1, date: new Date("2023-01-01") }])
      .mockRejectedValueOnce(new Error("Database error"));

    await expect(pastAndFutureEvents({ id: userId })).rejects.toThrow(
      "Database error"
    );
  });
});
