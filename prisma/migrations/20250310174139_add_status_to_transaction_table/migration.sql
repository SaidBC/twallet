/*
  Warnings:

  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PAID', 'PENDING');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "status" "STATUS" NOT NULL;
