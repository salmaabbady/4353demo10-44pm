import pool from '../backend/db';

afterAll(async () => {
  await pool.end();
});
