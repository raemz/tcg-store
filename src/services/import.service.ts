import { prisma } from "../db/prisma";
import { getSet, getCardsBySet} from "./scryfall.service";
import { upsertGame } from "../repositories/game.repository";
import { upsertCardSet } from "../repositories/cardset.repository";
import {
    createPrintings,
    getPrintingsBySet,
} from "../repositories/printing.repository";

import {
    createVariants,
    getVariantsBySet,
} from "../repositories/variant.repository";

import {
    createInventory,
} from "../repositories/inventory.repository";


export async function importSet(setCode: string) {
    const startedAt = new Date();
    const startTime = Date.now();

    console.log(`Import Started: ${setCode}`);
    //? To disable set import repeat
    const existingSet = await prisma.cardSet.findUnique({
        where: {
            code: setCode.toLowerCase(),
        }
    });

    if(existingSet) {
        console.log(`${existingSet.name} has already been imported!`)
        return {
            success: false,
            message: `${existingSet.name} has already been imported!`,
        }
    }

    // const set = await getSet(code);
    const cards = await getCardsBySet(setCode);

    console.log(`Downloaded ${cards.length} cards`);

    return prisma.$transaction(async (tx) => {
        // create game
        const game = await upsertGame(tx);

        // set code
        const firstCard = cards[0];

        // createa set
        const cardSet = await upsertCardSet(
            tx,
            game.id,
            firstCard.set
        )

        // getcard data s sscyfll, reshape sa kailangan lang
        const printingData = cards.map(card => ({
            cardSetId: cardSet.id,
            name: card.printing.name,
            collectorNumber: card.printing.collectorNumber,
            rarity: card.printing.rarity,
            imageUrl: card.printing.imageUrl,
            oracleText: card.printing.oracleText,
            manaCost: card.printing.manaCost,
            colors: card.printing.colors
        }));

        // mass inert, randomized id?? 
        // with DB auto generated id
        await createPrintings(tx, printingData);

        // get all card printing id
        const printings = await getPrintingsBySet(
            tx,
            cardSet.id
        )

        // to get the card id:
        const printingMap = new Map(
            printings.map((printing: { collectorNumber: number; id: number; }) => [
                printing.collectorNumber,
                printing.id
            ])
        );
        
        // non foil:
        const variantData = cards.map(card => ({
            printingId: printingMap.get(card.printing.collectorNumber)!,
            condition: "NM",
            language: "English",
            foil: false,
        }));

        await createVariants(
            tx,
            variantData
        )

        // get all varitants
        const variants = await getVariantsBySet(
            tx,
            cardSet.id
        );

        // map them shitters
        const inventoryData = variants.map((variant: { id: number; }) => ({
            variantId: variant.id,
            quantity: 0,
            costPrice: 0,
            sellPrice: 0
        }))

        // mass insert db
        await createInventory(
            tx,
            inventoryData
        )

        const finishedAt = new Date();
        const durationMs = Date.now() - startTime;

        return {
            success: true,
            set: cardSet.name,
            cardsDownloaded: cards.length,
            printingsImported: printingData.length,
            variantsImported: variantData.length,
            inventoryImported: inventoryData.length,
            // startedAt,
            // finishedAt,
            durationMs,
        };
    })

    
}
