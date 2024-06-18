
const { User, Event } = require("../../src/db");
const userAllEvents = require("../../src/Controllers/EventsControllers/userAllEvents");


jest.mock("../../src/db", () => ({
  User: {
    findOne: jest.fn(),
  },
  Event: {
    findAll: jest.fn(),
  },
}));

describe("userAllEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if the user is not an admin", async () => {
    User.findOne.mockResolvedValue(null);

    await expect(userAllEvents({ userId: 1 })).rejects.toThrow(
      "You are not authorized to view all events"
    );

    expect(User.findOne).toHaveBeenCalledWith({
      where: { id: 1, rol: "admin" },
    });
  });

  it("should return all events if the user is an admin", async () => {
    const mockAdmin = { id: 1, rol: "admin" };
    const mockEvents = [{ id: 1, name: "Event 1" }, { id: 2, name: "Event 2" }];

    User.findOne.mockResolvedValue(mockAdmin);
    Event.findAll.mockResolvedValue(mockEvents);

    const result = await userAllEvents({ userId: 1 });

    expect(result).toEqual(mockEvents);
    expect(User.findOne).toHaveBeenCalledWith({
      where: { id: 1, rol: "admin" },
    });
    expect(Event.findAll).toHaveBeenCalled();
  });

  it("should throw an error if there is an internal error", async () => {
    const mockError = new Error("Internal error");

    User.findOne.mockRejectedValue(mockError);

    await expect(userAllEvents({ userId: 1 })).rejects.toThrow(
      "Internal error"
    );
  });
});
