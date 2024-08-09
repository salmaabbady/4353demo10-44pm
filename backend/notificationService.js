import { query } from '../lib/db';

export const getNotifications = async () => {
  const result = await query('SELECT * FROM notifications');
  return result.rows;
};

export const addNotification = async (notification) => {
  const result = await query(
    'INSERT INTO notifications (volunteer_id, message) VALUES ($1, $2) RETURNING *',
    [notification.volunteer_id, notification.message]
  );
  return result.rows[0];
};
