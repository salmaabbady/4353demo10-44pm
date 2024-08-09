import { query } from '../lib/db';

export const getEvents = async () => {
  const result = await query('SELECT * FROM events');
  return result.rows;
};

export const addEvent = async (event) => {
  const result = await query(
    'INSERT INTO events (event_name, event_description, location, required_skills, urgency, event_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [event.event_name, event.event_description, event.location, event.required_skills, event.urgency, event.event_date]
  );
  return result.rows[0];
};
