/*
  Warnings:

  - You are about to drop the column `categoryID` on the `TableGroup` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MyUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TableCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created` to the `Region` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created` to the `SiteGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created` to the `TableGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteID` to the `TableGroup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PAYMENTPROCESSOR" AS ENUM ('VISA', 'MASTERCARD', 'DISCOVER', 'AMERICAN_EXPRESS', 'PAYPAL', 'APPLE_PAY', 'GOOGLE_PAY', 'CASH');

-- CreateEnum
CREATE TYPE "ITEMTYPE" AS ENUM ('FOOD', 'DRINK', 'ALCOHOL', 'CONDIMENT', 'SERVICE');

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_childID_fkey";

-- DropForeignKey
ALTER TABLE "MyUser" DROP CONSTRAINT "MyUser_successorId_fkey";

-- DropForeignKey
ALTER TABLE "TableCategory" DROP CONSTRAINT "TableCategory_siteID_fkey";

-- DropForeignKey
ALTER TABLE "TableGroup" DROP CONSTRAINT "TableGroup_categoryID_fkey";

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SiteGroup" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "parentID" INTEGER;

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TableGroup" DROP COLUMN "categoryID",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "parentID" INTEGER,
ADD COLUMN     "siteID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "MyUser";

-- DropTable
DROP TABLE "TableCategory";

-- CreateTable
CREATE TABLE "Server" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "ipaddr" INET NOT NULL,
    "role" TEXT NOT NULL,
    "siteID" INTEGER NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workstation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "ipaddr" INET NOT NULL,
    "role" TEXT NOT NULL,
    "siteID" INTEGER NOT NULL,

    CONSTRAINT "Workstation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Printer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "ipaddr" INET NOT NULL,
    "role" TEXT NOT NULL,
    "siteID" INTEGER NOT NULL,

    CONSTRAINT "Printer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KDS" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "ipaddr" INET NOT NULL,
    "role" TEXT NOT NULL,
    "siteID" INTEGER NOT NULL,

    CONSTRAINT "KDS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentProcessor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "paymentProcessor" "PAYMENTPROCESSOR" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "siteID" INTEGER NOT NULL,

    CONSTRAINT "PaymentProcessor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayCard" (
    "id" SERIAL NOT NULL,
    "paymentProcessor" "PAYMENTPROCESSOR" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "nameOnCard" TEXT NOT NULL,
    "cardNumber" BIGINT NOT NULL,
    "expDate" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,

    CONSTRAINT "PayCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "cardID" INTEGER,
    "siteID" INTEGER NOT NULL,
    "tableID" INTEGER,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "substitutionID" INTEGER,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "itemType" "ITEMTYPE" NOT NULL,
    "ingredientIDs" INTEGER[],

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IngredientToMenuItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Server_name_key" ON "Server"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Workstation_name_key" ON "Workstation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Printer_name_key" ON "Printer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "KDS_name_key" ON "KDS"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentProcessor_name_key" ON "PaymentProcessor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToMenuItem_AB_unique" ON "_IngredientToMenuItem"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToMenuItem_B_index" ON "_IngredientToMenuItem"("B");

-- AddForeignKey
ALTER TABLE "SiteGroup" ADD CONSTRAINT "SiteGroup_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "SiteGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableGroup" ADD CONSTRAINT "TableGroup_siteID_fkey" FOREIGN KEY ("siteID") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableGroup" ADD CONSTRAINT "TableGroup_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "TableGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_siteID_fkey" FOREIGN KEY ("siteID") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workstation" ADD CONSTRAINT "Workstation_siteID_fkey" FOREIGN KEY ("siteID") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Printer" ADD CONSTRAINT "Printer_siteID_fkey" FOREIGN KEY ("siteID") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KDS" ADD CONSTRAINT "KDS_siteID_fkey" FOREIGN KEY ("siteID") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentProcessor" ADD CONSTRAINT "PaymentProcessor_siteID_fkey" FOREIGN KEY ("siteID") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_cardID_fkey" FOREIGN KEY ("cardID") REFERENCES "PayCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_siteID_fkey" FOREIGN KEY ("siteID") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_tableID_fkey" FOREIGN KEY ("tableID") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_substitutionID_fkey" FOREIGN KEY ("substitutionID") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToMenuItem" ADD CONSTRAINT "_IngredientToMenuItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToMenuItem" ADD CONSTRAINT "_IngredientToMenuItem_B_fkey" FOREIGN KEY ("B") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
