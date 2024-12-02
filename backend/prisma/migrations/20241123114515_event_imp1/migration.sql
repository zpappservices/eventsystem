-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "isPublished" DROP NOT NULL,
ALTER COLUMN "isPublished" SET DEFAULT false;
