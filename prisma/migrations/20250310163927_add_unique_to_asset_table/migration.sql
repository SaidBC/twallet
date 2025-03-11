/*
  Warnings:

  - A unique constraint covering the columns `[userId,symbol]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Asset_symbol_key";

-- CreateIndex
CREATE UNIQUE INDEX "Asset_userId_symbol_key" ON "Asset"("userId", "symbol");
