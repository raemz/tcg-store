-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardSet" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CardSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardPrinting" (
    "id" SERIAL NOT NULL,
    "cardSetId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "collectorNumber" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "oracleText" TEXT NOT NULL,
    "manaCost" TEXT NOT NULL,

    CONSTRAINT "CardPrinting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardVariant" (
    "id" SERIAL NOT NULL,
    "printingId" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "foil" BOOLEAN NOT NULL,

    CONSTRAINT "CardVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_variantId_key" ON "Inventory"("variantId");

-- AddForeignKey
ALTER TABLE "CardSet" ADD CONSTRAINT "CardSet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardPrinting" ADD CONSTRAINT "CardPrinting_cardSetId_fkey" FOREIGN KEY ("cardSetId") REFERENCES "CardSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardVariant" ADD CONSTRAINT "CardVariant_printingId_fkey" FOREIGN KEY ("printingId") REFERENCES "CardPrinting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CardVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
