/*
  Warnings:

  - You are about to alter the column `price` on the `Inventory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[cardSetId,collectorNumber]` on the table `CardPrinting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `CardSet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CardPrinting" ALTER COLUMN "oracleText" DROP NOT NULL,
ALTER COLUMN "manaCost" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "notes" TEXT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- CreateIndex
CREATE UNIQUE INDEX "CardPrinting_cardSetId_collectorNumber_key" ON "CardPrinting"("cardSetId", "collectorNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CardSet_code_key" ON "CardSet"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Game_identifier_key" ON "Game"("identifier");
