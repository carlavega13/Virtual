const { Ticket } = require("../../src/db");
const bringUserTickets = require("../../src/Controllers/TicketsControllers/bringUserTickets"); 
jest.mock("../../src/db", () => ({
  Ticket: {
    findAll: jest.fn(),
  },
}));

describe("bringUserTickets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return tickets for the given user id", async () => {
    const userId = 1;
    const ticketsMock = [
      { id: 1, user_id: userId, event_id: 10 },
      { id: 2, user_id: userId, event_id: 20 },
    ];

    Ticket.findAll.mockResolvedValue(ticketsMock);

    const result = await bringUserTickets({ id: userId });

    expect(Ticket.findAll).toHaveBeenCalledWith({
      where: { user_id: userId },
    });

    expect(result).toEqual(ticketsMock);
  });

  it("should return an empty array if no tickets are found for the given user id", async () => {
    const userId = 2;

    Ticket.findAll.mockResolvedValue([]);

    const result = await bringUserTickets({ id: userId });

    expect(Ticket.findAll).toHaveBeenCalledWith({
      where: { user_id: userId },
    });

    expect(result).toEqual([]);
  });

  it("should throw an error if Ticket.findAll fails", async () => {
    const userId = 1;

    Ticket.findAll.mockRejectedValue(new Error("Database error"));

    await expect(bringUserTickets({ id: userId })).rejects.toThrow("Database error");
  });
});
