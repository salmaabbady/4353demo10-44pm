import { register, login } from '../backend/authService';
import bcrypt from 'bcrypt';
import pool from '../backend/db';

jest.mock('../backend/db', () => ({
  query: jest.fn()
}));

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should register a new user', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com' }] });
    const result = await register('test@example.com', 'password123');
    expect(result).toBeTruthy();
  });

  test('should login an existing user', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com', password: hashedPassword }] });
    const result = await login('test@example.com', 'password123');
    expect(result).toBeTruthy();
  });
});
