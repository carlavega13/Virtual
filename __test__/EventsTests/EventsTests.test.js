const { Event, User } = require('../../src/db');
const createEvent = require("../../src/Controllers/EventsControllers/createEvent"); // Asegúrate de ajustar la ruta al archivo correcto

jest.mock('../../db', () => ({
  Event: {
    create: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
  },
}));

describe('createEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an event when all fields are provided and user is admin', async () => {
    const eventData = {
      organizerId: 1,
      title: 'Test Event',
      description: 'Event Description',
      date: '2024-12-31',
      time: '18:00',
      location: 'Test Location',
      ticket_price: 50,
      available_tickets: 100,
    };

    User.findOne.mockResolvedValue({ id: 1, rol: 'admin' });
    Event.create.mockResolvedValue(eventData);

    const result = await createEvent(eventData);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { id: eventData.organizerId, rol: 'admin' },
    });
    expect(Event.create).toHaveBeenCalledWith({
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      ticket_price: eventData.ticket_price,
      available_tickets: eventData.available_tickets,
      organizer_id: eventData.organizerId,
    });
    expect(result).toEqual(eventData);
  });

  it('should throw an error if required fields are missing', async () => {
    const eventData = {
      organizerId: 1,
      title: 'Test Event',
    };

    await expect(createEvent(eventData)).rejects.toThrow('All fields are required');
  });

  it('should throw an error if user is not an admin', async () => {
    const eventData = {
      organizerId: 1,
      title: 'Test Event',
      description: 'Event Description',
      date: '2024-12-31',
      time: '18:00',
      location: 'Test Location',
      ticket_price: 50,
      available_tickets: 100,
    };

    User.findOne.mockResolvedValue(null);

    await expect(createEvent(eventData)).rejects.toThrow('You dont have permission to create an event');
  });

  it('should throw an error if Event.create fails', async () => {
    const eventData = {
      organizerId: 1,
      title: 'Test Event',
      description: 'Event Description',
      date: '2024-12-31',
      time: '18:00',
      location: 'Test Location',
      ticket_price: 50,
      available_tickets: 100,
    };

    User.findOne.mockResolvedValue({ id: 1, rol: 'admin' });
    Event.create.mockRejectedValue(new Error('Database error'));

    await expect(createEvent(eventData)).rejects.toThrow('Database error');
  });
});