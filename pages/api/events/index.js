// pages/api/events/index.js
import prisma from '../../../lib/prisma';
import authMiddleware from '../../../middleware/authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await authMiddleware(req, res, async () => {
      const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;

      try {
        const event = await prisma.eventDetails.create({
          data: {
            eventName,
            eventDescription,
            location,
            requiredSkills,
            urgency,
            eventDate: new Date(eventDate),
          },
        });

        return res.status(201).json(event);
      } catch (error) {
        console.error('Error creating event:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
  } else if (req.method === 'GET') {
    await authMiddleware(req, res, async () => {
      try {
        const events = await prisma.eventDetails.findMany();
        return res.status(200).json(events);
      } catch (error) {
        console.error('Error fetching events:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
