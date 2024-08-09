/*
  Warnings:

  - The primary key for the `States` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `code` on the `States` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(2)`.
  - Changed the type of `requiredSkills` on the `EventDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `skills` on the `UserProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `availability` on the `UserProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_volunteerId_fkey";

-- DropForeignKey
ALTER TABLE "VolunteerHistory" DROP CONSTRAINT "VolunteerHistory_eventId_fkey";

-- DropForeignKey
ALTER TABLE "VolunteerHistory" DROP CONSTRAINT "VolunteerHistory_volunteerId_fkey";

-- AlterTable
ALTER TABLE "EventDetails" DROP COLUMN "requiredSkills",
ADD COLUMN     "requiredSkills" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "States" DROP CONSTRAINT "States_pkey",
ALTER COLUMN "code" SET DATA TYPE CHAR(2),
ADD CONSTRAINT "States_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "skills",
ADD COLUMN     "skills" JSONB NOT NULL,
DROP COLUMN "availability",
ADD COLUMN     "availability" JSONB NOT NULL;
