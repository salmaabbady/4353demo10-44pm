import prisma from '../../../lib/prisma';
import authMiddleware from '../../../middleware/authMiddleware';

const handler = async (req, res) => {
  await authMiddleware(req, res, async () => {
    try {
      const volunteers = await prisma.userProfile.findMany({
        include: {
          user: true,
          VolunteerHistory: true,
        },
      });

      return res.status(200).json(volunteers);
    } catch (error) {
      console.error('Error fetching volunteer data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
};

export default handler;
