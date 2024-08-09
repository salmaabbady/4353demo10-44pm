/*
  Warnings:

  - You are about to drop the `Notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `States` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Notifications";

-- DropTable
DROP TABLE "States";

-- AddForeignKey
ALTER TABLE "VolunteerHistory" ADD CONSTRAINT "VolunteerHistory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
