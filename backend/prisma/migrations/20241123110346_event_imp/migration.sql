/*
  Warnings:

  - You are about to drop the column `EventDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `EventTime` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "EventDate",
DROP COLUMN "EventTime",
ADD COLUMN     "EndDate" TIMESTAMP(3),
ADD COLUMN     "EndTime" TEXT,
ADD COLUMN     "StartDate" TIMESTAMP(3),
ADD COLUMN     "StartTime" TEXT;
