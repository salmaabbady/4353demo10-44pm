import { addVolunteerHistory } from '../backend/historyService';
import { query } from '../backend/db';

jest.mock('../backend/db', () => ({
  query: jest.fn()
}));

describe('historyService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should add a new volunteer history record', async () => {
    const newRecord = {
      volunteer_id: 1,
      event_id: 1,
      participation_status: 'attended'
    };
    query.mockResolvedValueOnce({ rows: [{ id: 1, volunteer_id: 1, event_id: 1, participation_status: 'attended' }] });
    const record = await addVolunteerHistory(newRecord.volunteer_id, newRecord.event_id, newRecord.participation_status);
    expect(record).toBeTruthy();
  });
});
