import prisma from '../../../lib/prisma';
import authMiddleware from '../../../middleware/authMiddleware';

const handler = async (req, res) => {
  await authMiddleware(req, res, async () => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
      const userProfile = await prisma.userProfile.findUnique({
        where: { userId: user.id },
        include: { user: true },  // Ensure this line includes the user credentials
      });

      if (!userProfile) {
        return res.status(404).json({ error: 'User profile not found' });
      }

      return res.status(200).json(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
};

export default handler;
