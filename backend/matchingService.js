// backend/matchingService.js
import pool from '../lib/db';

const matchVolunteerToEvent = async (volunteerId, eventId) => {
  const result = await pool.query(
    'INSERT INTO volunteer_history (volunteer_id, event_id) VALUES ($1, $2) RETURNING *',
    [volunteerId, eventId]
  );
  return result.rows[0];
};

export { matchVolunteerToEvent };
