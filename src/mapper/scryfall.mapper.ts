export function mapSet(set: any) {
    return {
        code: set.code,
        name: set.name,
        releaseDate: new Date(set.released_at),
        cardCount: set.card_count
    }
}

export function mapCard(card: any) {
    return {
        set: {
            code: card.set,
            name: card.set_name,
            releaseDate: new Date(card.released_at)
        },

        printing: {
            name: card.name,
            collectorNumber: card.collector_number,
            rarity: card.rarity,
            imageUrl: card.image_uris?.normal ?? "",
            oracleText: card.oracle_text ?? null,
            manaCost: card.mana_cost ?? null,
            colors: card.colors,
        }
    };
}