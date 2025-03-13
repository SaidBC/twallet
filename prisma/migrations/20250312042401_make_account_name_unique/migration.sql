/*
  Warnings:

  - A unique constraint covering the columns `[accountName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_accountName_key" ON "User"("accountName");
