export function buildPrintingData(cards: any[], cardSetId: number) {
    return cards.map(card => ({
        cardSetId,
        name: card.printing.name,
        collectorNumber: card.printing.collectorNumber,
        rarity: card.printing.rarity,
        imageUrl: card.printing.imageUrl,
        oracleText: card.printing.oracleText,
        manaCost: card.printing.manaCost,
        colors: card.printing.colors,
    }));
}