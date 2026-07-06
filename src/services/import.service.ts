import { prisma } from "../db/prisma";
import { getSet, getCardsBySet} from "./scryfall.service";

export async function importSet(code: string) {
    const set = await getSet(code);
    const cards = await getCardsBySet(code);

    console.log(`Downloaded ${cards.length} cards`);

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

    const firstCard = cards[0];

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

    for (const card of cards) {
        const printing = await prisma.cardPrinting.upsert({
            where: {
                cardSetId_collectorNumber: {
                    cardSetId: cardSet.id,
                    collectorNumber: card.printing.collectorNumber,
                },
            },
            update: {},
            create: {
                cardSetId: cardSet.id,
                name: card.printing.name,
                collectorNumber: card.printing.collectorNumber,
                rarity: card.printing.rarity,
                imageUrl: card.printing.imageUrl,
                oracleText: card.printing.oracleText,
                manaCost: card.printing.manaCost,
            },
        });

        await prisma.cardVariant.upsert({
            where: {
                printingId_condition_language_foil: {
                    printingId: printing.id,
                    condition: "NM",
                    language: "English",
                    foil: false,
                },
            },
            update: {},
            create: {
                printingId: printing.id,
                condition: "NM",
                language: "English",
                foil: false,
            },
        });

        console.log(`Imported ${printing.name}`);
    }

    

    return {
        set,
        cardCount: cards.length
    };
}