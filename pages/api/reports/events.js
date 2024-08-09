import prisma from '../../../lib/prisma';
import authMiddleware from '../../../middleware/authMiddleware';

const handler = async (req, res) => {
  await authMiddleware(req, res, async () => {
    try {
      const events = await prisma.eventDetails.findMany({
        include: {
          VolunteerHistory: {
            include: {
              userProfile: true,
            },
          },
        },
      });

      return res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching event data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
};

export default handler;
