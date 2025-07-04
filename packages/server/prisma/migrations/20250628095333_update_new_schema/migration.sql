/*
  Warnings:

  - You are about to drop the column `courseId` on the `Video` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lessonId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `duration` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "courseId",
ADD COLUMN     "aspectRatio" TEXT,
ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lessonId" TEXT,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "posterTime" DOUBLE PRECISION,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'preparing';

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLessonProgress" (
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" TEXT,

    CONSTRAINT "UserLessonProgress_pkey" PRIMARY KEY ("userId","lessonId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_courseId_key" ON "Lesson"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "UserLessonProgress_userId_key" ON "UserLessonProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserLessonProgress_lessonId_key" ON "UserLessonProgress"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_lessonId_key" ON "Video"("lessonId");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLessonProgress" ADD CONSTRAINT "UserLessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLessonProgress" ADD CONSTRAINT "UserLessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLessonProgress" ADD CONSTRAINT "UserLessonProgress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
