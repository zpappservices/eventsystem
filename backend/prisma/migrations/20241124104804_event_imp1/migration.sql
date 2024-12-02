-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "locationType" TEXT,
ALTER COLUMN "AllDay" SET DEFAULT false;

-- CreateTable
CREATE TABLE "EventTicket" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "price" TEXT,
    "quantity" INTEGER NOT NULL,
    "eventId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "updatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventTicket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventTicket" ADD CONSTRAINT "EventTicket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
