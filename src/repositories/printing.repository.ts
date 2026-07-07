export async function createPrintings(
    db: any,
    printingData: any[]
) {
    return db.cardPrinting.createMany({
        data: printingData,
        skipDuplicates: true
    });
}

export async function getPrintingsBySet(
    db: any,
    cardSetId: number
) {
    return db.cardPrinting.findMany({
        where: {
            cardSetId,
        },
    });
}