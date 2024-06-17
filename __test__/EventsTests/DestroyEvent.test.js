const { Event, User } = require('../../src/db');
const destroyEvent = require('../../src/Controllers/EventsControllers/destroyEvent');

jest.mock('../../src/db', () => ({
  Event: {
    destroy: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
  },
}));

describe('destroyEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should destroy an event when organizer is admin and event exists', async () => {
    const eventData = {
      organizer_id: 1,
      event_id: 1,
    };

    User.findOne.mockResolvedValue({ id: 1, rol: 'admin' });
    Event.destroy.mockResolvedValue(1); // 1 indica que se ha destruido una fila

    const result = await destroyEvent(eventData);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { id: eventData.organizer_id, rol: 'admin' },
    });
    expect(Event.destroy).toHaveBeenCalledWith({
      where: { id: eventData.event_id, organizer_id: eventData.organizer_id },
    });
    expect(result).toEqual(1);
  });

  it('should throw an error if user is not an admin', async () => {
    const eventData = {
      organizer_id: 1,
      event_id: 1,
    };

    User.findOne.mockResolvedValue(null);

    await expect(destroyEvent(eventData)).rejects.toThrow('You dont have permission to create an event');
  });

  it('should throw an error if Event.destroy fails', async () => {
    const eventData = {
      organizer_id: 1,
      event_id: 1,
    };

    User.findOne.mockResolvedValue({ id: 1, rol: 'admin' });
    Event.destroy.mockRejectedValue(new Error('Database error'));

    await expect(destroyEvent(eventData)).rejects.toThrow('Database error');
  });
});
