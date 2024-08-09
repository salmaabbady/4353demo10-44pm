// tests/matchingService.test.js
import { matchVolunteerToEvent } from '../backend/matchingService';

jest.mock('../backend/db', () => ({
  query: jest.fn()
}));

const pool = require('../backend/db');

describe('matchingService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should match volunteer to event', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ volunteer_id: 1, event_id: 2 }] });
    const result = await matchVolunteerToEvent(1, 2);
    expect(result).toEqual({ volunteer_id: 1, event_id: 2 });
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO volunteer_history (volunteer_id, event_id) VALUES ($1, $2) RETURNING *',
      [1, 2]
    );
  });
});
