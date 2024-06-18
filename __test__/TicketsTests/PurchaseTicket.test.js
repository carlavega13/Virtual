const { Event, Ticket } = require("../../src/db");
// const crypto = require("crypto");
const postMailController = require("../../src/Controllers/sendGridControllers/postMailController");
const htmlTicketPurchased = require("../../src/Controllers/sendGridControllers/htmlTicketPurchased");
const purchaseTicket = require("../../src/Controllers/TicketsControllers/purchaseTicket"); // Ajusta la ruta al archivo correcto

jest.mock("../../src/db", () => ({
  Event: {
    findOne: jest.fn(),
  },
  Ticket: {
    create: jest.fn(),
  },
}));

jest.mock("crypto", () => ({
  randomBytes: jest.fn().mockReturnValue({
    toString: jest.fn().mockReturnValue("randomHex"),
  }),
}));

jest.mock("../../src/Controllers/sendGridControllers/postMailController");
jest.mock("../../src/Controllers/sendGridControllers/htmlTicketPurchased");

describe("purchaseTicket", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should purchase tickets and send confirmation emails", async () => {
    const eventMock = {
      id: 1,
      title: "Event Title",
      date: new Date(),
      ticket_price: 100,
      available_tickets: 10,
      update: jest.fn(),
    };
    const info = {
      eventId: 1,
      numberOfTickets: 2,
      userId: 1,
      email: "user@example.com",
    };

    Event.findOne.mockResolvedValue(eventMock);
    Ticket.create.mockResolvedValue({ ticket_code: "randomHex" });
    htmlTicketPurchased.mockReturnValue("HTML Content");
    postMailController.mockResolvedValue(true);

    const tickets = await purchaseTicket(info);


    expect(Event.findOne).toHaveBeenCalledWith({ where: { id: info.eventId } });
    expect(Ticket.create).toHaveBeenCalledTimes(2);
    expect(postMailController).toHaveBeenCalledTimes(2);
    expect(eventMock.update).toHaveBeenCalledWith({
      available_tickets: eventMock.available_tickets - info.numberOfTickets,
    });
    expect(tickets).toHaveLength(2);
  });

  it("should throw an error if not enough tickets are available", async () => {
    const eventMock = {
      id: 1,
      available_tickets: 1,
    };
    const info = {
      eventId: 1,
      numberOfTickets: 2,
      userId: 1,
      email: "user@example.com",
    };

    Event.findOne.mockResolvedValue(eventMock);

    await expect(purchaseTicket(info)).rejects.toThrow("There is not enougth tickets to purchase");
  });

  it("should throw an error if Event.findOne fails", async () => {
    const info = {
      eventId: 1,
      numberOfTickets: 2,
      userId: 1,
      email: "user@example.com",
    };

    Event.findOne.mockRejectedValue(new Error("Database error"));

    await expect(purchaseTicket(info)).rejects.toThrow("Database error");
  });
});
