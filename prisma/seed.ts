import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // wipe
  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.cardVariant.deleteMany();
  await prisma.cardPrinting.deleteMany();
  await prisma.cardSet.deleteMany();
  await prisma.game.deleteMany();

  const mtg = await prisma.game.create({
    data: { name: "Magic: The Gathering", identifier: "mtg" },
  });

  const bloomburrow = await prisma.cardSet.create({
    data: {
      gameId: mtg.id,
      name: "Bloomburrow",
      code: "BLB",
      releaseDate: new Date("2024-08-02"),
    },
  });

  const printing = await prisma.cardPrinting.create({
    data: {
      cardSetId: bloomburrow.id,
      name: "Hop to It",
      collectorNumber: "001",
      rarity: "common",
      imageUrl: "https://example.com/hop-to-it.jpg",
      oracleText: "Create a 1/1 white Rabbit Warrior creature token.",
      manaCost: "{1}{W}",
    },
  });

  const variant = await prisma.cardVariant.create({
    data: {
      printingId: printing.id,
      condition: "Near Mint",
      language: "EN",
      foil: false,
    },
  });

  await prisma.inventory.create({
    data: {
      variantId: variant.id,
      quantity: 12,
      costPrice: 0.5,
      sellPrice: 1.25,
    },
  });

  // A second variant
  const foilVariant = await prisma.cardVariant.create({
    data: {
      printingId: printing.id,
      condition: "Near Mint",
      language: "EN",
      foil: true,
    },
  });

  await prisma.inventory.create({
    data: {
      variantId: foilVariant.id,
      quantity: 3,
      costPrice: 2.0,
      sellPrice: 5.0,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });