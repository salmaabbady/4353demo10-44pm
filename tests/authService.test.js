import { register, login } from '../backend/authService';
import pool from '../backend/db';
import bcrypt from 'bcrypt';

jest.mock('../backend/db', () => ({
  query: jest.fn()
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user Paul Atreides', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'paul.atreides@arrakis.com' }] });
    const user = await register('paul.atreides@arrakis.com', 'MuadDib');
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('paul.atreides@arrakis.com');
  });

  it('should register a new user Lisan Al Gaib', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 2, email: 'lisan.al.gaib@arrakis.com' }] });
    const user = await register('lisan.al.gaib@arrakis.com', 'KwizatzHaderach');
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('lisan.al.gaib@arrakis.com');
  });

  it('should login a user Paul Atreides', async () => {
    const hashedPassword = await bcrypt.hash('MuadDib', 10);
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'paul.atreides@arrakis.com', password: hashedPassword }] });
    const user = await login('paul.atreides@arrakis.com', 'MuadDib');
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('paul.atreides@arrakis.com');
  });

  it('should login a user Lisan Al Gaib', async () => {
    const hashedPassword = await bcrypt.hash('KwizatzHaderach', 10);
    pool.query.mockResolvedValueOnce({ rows: [{ id: 2, email: 'lisan.al.gaib@arrakis.com', password: hashedPassword }] });
    const user = await login('lisan.al.gaib@arrakis.com', 'KwizatzHaderach');
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('lisan.al.gaib@arrakis.com');
  });
});
