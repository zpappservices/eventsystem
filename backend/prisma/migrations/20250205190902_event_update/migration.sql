/*
  Warnings:

  - You are about to drop the column `chargeFee` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "chargeFee",
ADD COLUMN     "platformFee" BOOLEAN NOT NULL DEFAULT false;
