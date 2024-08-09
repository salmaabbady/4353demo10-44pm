// backend/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export const register = async ({ email, password, profile }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.userCredentials.create({
    data: {
      email,
      password: hashedPassword,
      profile: {
        create: profile,
      },
    },
  });

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token validity duration
  );

  return { user, token };
};

export const login = async (email, password) => {
  const user = await prisma.userCredentials.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token validity duration
  );

  return { user, token };
};
