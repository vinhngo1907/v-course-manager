/*
  Warnings:

  - The `status` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('PREPARING', 'UPLOADING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "position" SET DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" "VideoStatus" NOT NULL DEFAULT 'PREPARING';
