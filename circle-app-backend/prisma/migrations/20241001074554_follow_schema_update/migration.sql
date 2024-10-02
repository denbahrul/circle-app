/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Follow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "createdAt",
DROP COLUMN "updateAt";
