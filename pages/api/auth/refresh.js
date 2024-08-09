// pages/api/auth/refresh.js
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });

    const user = await prisma.userCredentials.findUnique({ where: { email: decoded.email } });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const newToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export default handler;
