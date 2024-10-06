/*
  Warnings:

  - You are about to drop the column `replyId` on the `like_replies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId,repliesId]` on the table `like_replies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `repliesId` to the `like_replies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "like_replies" DROP CONSTRAINT "like_replies_replyId_fkey";

-- DropIndex
DROP INDEX "like_replies_authorId_replyId_key";

-- AlterTable
ALTER TABLE "like_replies" DROP COLUMN "replyId",
ADD COLUMN     "repliesId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "like_replies_authorId_repliesId_key" ON "like_replies"("authorId", "repliesId");

-- AddForeignKey
ALTER TABLE "like_replies" ADD CONSTRAINT "like_replies_repliesId_fkey" FOREIGN KEY ("repliesId") REFERENCES "replies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
