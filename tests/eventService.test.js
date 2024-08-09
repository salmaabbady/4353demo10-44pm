import { getEvents, addEvent } from '../backend/eventService';
import { query } from '../backend/db';

jest.mock('../backend/db', () => ({
  query: jest.fn()
}));

describe('eventService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should get all events', async () => {
    query.mockResolvedValueOnce({ rows: [{ id: 1, event_name: 'Test Event' }] });
    const events = await getEvents();
    expect(events).toBeTruthy();
  });

  test('should add a new event', async () => {
    const newEvent = {
      event_name: 'Test Event',
      event_description: 'Description of test event',
      location: 'Test Location',
      required_skills: ['Skill1', 'Skill2'],
      urgency: 'high',
      event_date: '2024-01-01'
    };
    query.mockResolvedValueOnce({ rows: [{ id: 1, event_name: 'Test Event' }] });
    const event = await addEvent(newEvent);
    expect(event).toBeTruthy();
  });
});
