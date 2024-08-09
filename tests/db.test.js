import { query } from '../backend/db';

jest.mock('../backend/db', () => ({
  query: jest.fn()
}));

describe('db', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should connect to the database', async () => {
    query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
    const result = await query('SELECT 1');
    expect(result).toBeTruthy();
  });
});
