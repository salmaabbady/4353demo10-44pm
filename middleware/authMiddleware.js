// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    const user = await prisma.userCredentials.findUnique({ where: { email: decoded.email } });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authMiddleware;
