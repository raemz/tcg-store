import { success } from "zod";
import { prisma } from "../db/prisma";
import { getSet, getCardsBySet} from "./scryfall.service";

export async function importSet(code: string) {
    // const set = await getSet(code);
    const cards = await getCardsBySet(code);

    console.log(`Downloaded ${cards.length} cards`);

    // create game
    const game = await prisma.game.upsert({
        where: {
            identifier: "mtg",
        },
        update: {},
        create: {
            name: "Magic: The Gathering",
            identifier: "mtg"
        }
    });

    // set code
    const firstCard = cards[0];

    // createa set
    const cardSet = await prisma.cardSet.upsert({
        where: {
            code: firstCard.set.code,
        },
        update: {},
        create: {
            gameId: game.id,
            name: firstCard.set.name,
            code: firstCard.set.code,
            releaseDate: firstCard.set.releaseDate,
        },
    });

    // getcard data s sscyfll, reshape sa kailangan lang
    const printingData = cards.map(card => ({
        cardSetId: cardSet.id,
        name: card.printing.name,
        collectorNumber: card.printing.collectorNumber,
        rarity: card.printing.rarity,
        imageUrl: card.printing.imageUrl,
        oracleText: card.printing.oracleText,
        manaCost: card.printing.manaCost,
    }));

    // mass inert
    await prisma.cardPrinting.createMany({
        data: printingData,
        skipDuplicates: true,
    });

    // get all card printing
    const printings = await prisma.cardPrinting.findMany({
        where: {
            cardSetId: cardSet.id,
        },
    });

    
    const printingMap = new Map(
        printings.map(printing => [
            printing.collectorNumber,
            printing.id
        ])
    );
    
    const variantData = cards.map(card => ({
        printingId: printingMap.get(card.printing.collectorNumber)!,
        condition: "NM",
        language: "English",
        foil: false,
    }));

    await prisma.cardVariant.createMany({
        data: variantData,
        skipDuplicates: true,
    });    

    return {
        success: true,
        set: cardSet.name,
        importedPrintings: printingData.length,
        importedVariants: variantData.length
    };
}