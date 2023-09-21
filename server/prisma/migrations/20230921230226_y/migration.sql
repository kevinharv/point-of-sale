/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_successorId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "MyUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "successorId" INTEGER,

    CONSTRAINT "MyUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MyUser_successorId_key" ON "MyUser"("successorId");

-- AddForeignKey
ALTER TABLE "MyUser" ADD CONSTRAINT "MyUser_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "MyUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
