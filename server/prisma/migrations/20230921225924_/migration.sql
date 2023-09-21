/*
  Warnings:

  - You are about to drop the column `regionID` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupID` on the `Site` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[childID]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `siteGroupID` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_regionID_fkey";

-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_groupID_fkey";

-- DropIndex
DROP INDEX "Group_name_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "regionID",
ADD COLUMN     "childID" INTEGER;

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "groupID",
ADD COLUMN     "siteGroupID" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "successorId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionID" INTEGER NOT NULL,

    CONSTRAINT "SiteGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "siteID" INTEGER NOT NULL,

    CONSTRAINT "TableCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryID" INTEGER NOT NULL,

    CONSTRAINT "TableGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "groupID" INTEGER NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_successorId_key" ON "User"("successorId");

-- CreateIndex
CREATE UNIQUE INDEX "SiteGroup_name_key" ON "SiteGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TableCategory_name_key" ON "TableCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TableGroup_name_key" ON "TableGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Table_name_key" ON "Table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Group_childID_key" ON "Group"("childID");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_childID_fkey" FOREIGN KEY ("childID") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteGroup" ADD CONSTRAINT "SiteGroup_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_siteGroupID_fkey" FOREIGN KEY ("siteGroupID") REFERENCES "SiteGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableCategory" ADD CONSTRAINT "TableCategory_siteID_fkey" FOREIGN KEY ("siteID") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableGroup" ADD CONSTRAINT "TableGroup_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "TableCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES "TableGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
