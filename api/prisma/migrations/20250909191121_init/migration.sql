-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."ShareAccess" AS ENUM ('READ', 'EDIT');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Link" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "thumbnail" TEXT,
    "domain" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "userId" TEXT NOT NULL,
    "collectionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LinkTag" (
    "linkId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "LinkTag_pkey" PRIMARY KEY ("linkId","tagId")
);

-- CreateTable
CREATE TABLE "public"."Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SharedLink" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "access" "public"."ShareAccess" NOT NULL DEFAULT 'READ',
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SharedCollection" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "access" "public"."ShareAccess" NOT NULL DEFAULT 'READ',
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "public"."Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SharedLink_token_key" ON "public"."SharedLink"("token");

-- CreateIndex
CREATE UNIQUE INDEX "SharedCollection_token_key" ON "public"."SharedCollection"("token");

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LinkTag" ADD CONSTRAINT "LinkTag_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "public"."Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LinkTag" ADD CONSTRAINT "LinkTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Collection" ADD CONSTRAINT "Collection_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SharedLink" ADD CONSTRAINT "SharedLink_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "public"."Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SharedLink" ADD CONSTRAINT "SharedLink_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SharedCollection" ADD CONSTRAINT "SharedCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SharedCollection" ADD CONSTRAINT "SharedCollection_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
