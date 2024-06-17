const { Op, where, fn, col, literal } = require("sequelize");
const { Event } = require("../../src/db");
const searchEvents = require("../../src/Controllers/EventsControllers/searchEvents");

jest.mock("../../src/db", () => ({
  Event: {
    findAll: jest.fn(),
  },
}));

describe("searchEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return events matching the search text", async () => {
    const searchText = "test";
    const searchPattern = `%${searchText.toLowerCase()}%`;
    const eventsMock = [
      { id: 1, title: "Test Event", description: "Description for test event" },
    ];

    Event.findAll.mockResolvedValue(eventsMock);

    const result = await searchEvents({ text: searchText });

    expect(Event.findAll).toHaveBeenCalledWith({
      where: {
        [Op.or]: [
          where(fn("LOWER", col("title")), { [Op.like]: searchPattern }),
          where(fn("LOWER", col("description")), { [Op.like]: searchPattern }),
          where(literal(`TO_CHAR(date, 'YYYY-MM-DD')`), { [Op.like]: searchPattern }),
          where(fn("LOWER", col("location")), { [Op.like]: searchPattern }),
          where(literal(`LOWER(CAST("ticket_price" AS TEXT))`), { [Op.like]: searchPattern }),
        ],
      },
    });

    expect(result).toEqual(eventsMock);
  });

  it("should return an empty array if no events match the search text", async () => {
    const searchText = "nonexistent";
    const searchPattern = `%${searchText.toLowerCase()}%`;

    Event.findAll.mockResolvedValue([]);

    const result = await searchEvents({ text: searchText });

    expect(Event.findAll).toHaveBeenCalledWith({
      where: {
        [Op.or]: [
          where(fn("LOWER", col("title")), { [Op.like]: searchPattern }),
          where(fn("LOWER", col("description")), { [Op.like]: searchPattern }),
          where(literal(`TO_CHAR(date, 'YYYY-MM-DD')`), { [Op.like]: searchPattern }),
          where(fn("LOWER", col("location")), { [Op.like]: searchPattern }),
          where(literal(`LOWER(CAST("ticket_price" AS TEXT))`), { [Op.like]: searchPattern }),
        ],
      },
    });

    expect(result).toEqual([]);
  });

  it("should throw an error if Event.findAll fails", async () => {
    const searchText = "test";

    Event.findAll.mockRejectedValue(new Error("Database error"));

    await expect(searchEvents({ text: searchText })).rejects.toThrow("Database error");
  });
});
