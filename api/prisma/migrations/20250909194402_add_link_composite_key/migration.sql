/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_id_userId_key" ON "public"."Link"("id", "userId");
