import { prisma } from "../db/prisma";
import { getSet, getCardsBySet} from "./scryfall.service";
import { upsertGame } from "../repositories/game.repository";
import { upsertCardSet } from "../repositories/cardset.repository";
import {
    createPrintings,
    getPrintingsBySet,
} from "../repositories/printing.repository";
import { generateVariants } from "../utils/variant-generator";
import { buildPrintingData } from "../builders/printing.builder";

import {
    createVariants,
    getVariantsBySet,
} from "../repositories/variant.repository";

import {
    createInventory,
} from "../repositories/inventory.repository";
import { buildPrintingMap } from "../builders/printing-map.builder";
import { buildInventoryData } from "../builders/inventory.builder";


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
        const printingData = buildPrintingData(cards, cardSet.id);

        // mass inert, randomized id?? 
        // with DB auto generated id
        await createPrintings(tx, printingData);

        // get all card printing id
        const printings = await getPrintingsBySet(
            tx,
            cardSet.id
        )

        // to get the card id:
        const printingMap = buildPrintingMap(printings);
        
        // non foil:
        const variantData = cards.flatMap(card => 
            generateVariants(printingMap.get(card.printing.collectorNumber)!)
        )

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
        const inventoryData = buildInventoryData(variants);

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
