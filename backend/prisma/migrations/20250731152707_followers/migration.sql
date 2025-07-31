/*
  Warnings:

  - You are about to drop the column `userId` on the `VendorFollower` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VendorFollower" DROP COLUMN "userId",
ADD COLUMN     "buyerId" TEXT;

-- AddForeignKey
ALTER TABLE "VendorFollower" ADD CONSTRAINT "Buyer_Follow_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorFollower" ADD CONSTRAINT "Vendor_Follow_fkey" FOREIGN KEY ("vendorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
