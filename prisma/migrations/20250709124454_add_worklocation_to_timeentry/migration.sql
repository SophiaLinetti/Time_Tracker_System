/*
  Warnings:

  - You are about to drop the column `isValid` on the `TimeEntry` table. All the data in the column will be lost.
  - Added the required column `location` to the `TimeEntry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkLocation" AS ENUM ('HOME_OFFICE', 'REMOTE', 'BÜRO');

-- AlterTable
ALTER TABLE "TimeEntry" DROP COLUMN "isValid",
ADD COLUMN     "location" "WorkLocation" NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL;
