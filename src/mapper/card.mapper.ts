import type { CardSearchResult } from "../repositories/card.repository"

export function toCardSearchDTO(card: CardSearchResult) {
    return {
        variantId: card.id,
        name: card.printing.name,
        set: card.printing.cardSet.name,
        setCode: card.printing.cardSet.code,
        collectorNumber: card.printing.collectorNumber,
        rarity: card.printing.rarity,
        imageUrl: card.printing.imageUrl,
        foil: card.foil,
        condition: card.condition,
        language: card.language,
        stock: card.inventory?.quantity ?? 0,
        sellPrice: Number(card.inventory?.sellPrice ?? 0),
    }
}