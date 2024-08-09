// components/VolunteerHistoryTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/VolunteerHistoryTable.module.css';

const VolunteerHistoryTable = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Description</th>
          <th>Location</th>
          <th>Skills</th>
          <th>Urgency</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {history.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.eventName}</td>
            <td>{entry.eventDescription}</td>
            <td>{entry.location}</td>
            <td>{entry.skills.join(', ')}</td>
            <td>{entry.urgency}</td>
            <td>{entry.date}</td>
            <td>{entry.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VolunteerHistoryTable;
