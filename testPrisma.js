import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const userId = 3; // Replace with a valid user ID from your database

  console.log(`Fetching user profile for userId: ${userId}`);

  try {
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId: userId },
      include: { userCredentials: true },
    });

    if (!userProfile) {
      console.log(`No user profile found for userId: ${userId}`);
    } else {
      console.log('User Profile:', userProfile);
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(e => {
    console.error('Script error:', e);
  });
