/*
  Warnings:

  - Added the required column `vendorId` to the `EventTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventTransaction" ADD COLUMN     "vendorId" TEXT NOT NULL;
