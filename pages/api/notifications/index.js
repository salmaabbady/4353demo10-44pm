// pages/api/notifications/index.js
import { getNotifications, addNotification } from '../../../backend/notificationService';

export default async function handler(req, res) {
  console.log(`${req.method} request to /api/notifications`);

  if (req.method === 'GET') {
    const notifications = await getNotifications();
    console.log('GET notifications:', notifications);
    return res.status(200).json(notifications);
  }

  if (req.method === 'POST') {
    const notification = req.body;
    const result = await addNotification(notification);
    console.log('Notification added:', result);
    return res.status(201).json(result);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
