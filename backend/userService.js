// backend/userService.js
import prisma from '../lib/prisma';

async function getUsers() {
  return await prisma.userCredentials.findMany();
}

async function addUser(user) {
  const { email, password } = user;
  return await prisma.userCredentials.create({
    data: { email, password },
  });
}

export default {
  getUsers,
  addUser,
};
