/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expectedSalary` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noticePeriod` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "currentCompany" TEXT,
ADD COLUMN     "expectedSalary" INTEGER NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL,
ADD COLUMN     "noticePeriod" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "coverLetter" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "salary",
ADD COLUMN     "salary" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Application_email_key" ON "Application"("email");
