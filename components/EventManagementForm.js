// components/EventManagementForm.js
import { useState } from 'react';
import axios from 'axios';

const EventManagementForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [urgency, setUrgency] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('/api/events', {
        eventName,
        eventDescription,
        location,
        requiredSkills: requiredSkills.split(','),
        urgency,
        eventDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      setMessage('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Event Name:</label>
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
      </div>
      <div>
        <label>Event Description:</label>
        <input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div>
        <label>Required Skills:</label>
        <input type="text" value={requiredSkills} onChange={(e) => setRequiredSkills(e.target.value)} required />
      </div>
      <div>
        <label>Urgency:</label>
        <input type="text" value={urgency} onChange={(e) => setUrgency(e.target.value)} required />
      </div>
      <div>
        <label>Event Date:</label>
        <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
      </div>
      <button type="submit">Create Event</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EventManagementForm;
