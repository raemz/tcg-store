-- CreateEnum
CREATE TYPE "MtgColor" AS ENUM ('W', 'U', 'B', 'R', 'G');

-- AlterTable
ALTER TABLE "CardPrinting" ADD COLUMN     "colors" "MtgColor"[];
