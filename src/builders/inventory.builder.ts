export function buildInventoryData(variants: any[]) {
    return variants.map(variants => ({
        variantId: variants.id,
        quantity: 0,
        costPrice: 0,
        sellPrice: 0
    }));
}