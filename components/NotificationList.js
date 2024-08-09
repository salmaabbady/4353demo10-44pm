// components/NotificationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/NotificationList.module.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <ul className={styles.notificationList}>
      {notifications.map((notification) => (
        <li key={notification.id}>{notification.message}</li>
      ))}
    </ul>
  );
};

export default NotificationList;
