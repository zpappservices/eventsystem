/*
  Warnings:

  - The `price` column on the `EventTicket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `type` to the `EventTicket` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `EventTicket` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EventTicket" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0;
