export async function createVariants(
    db: any,
    variantData: any[]
) {
    return db.cardVariant.createMany({
        data: variantData,
        skipDuplicates: true
    });
}

export async function getVariantsBySet(
    db: any,
    cardSetId: number
) {
    return db.cardVariant.findMany({
        where: {
            printing: {
                cardSetId,
            },
        },
    });
}