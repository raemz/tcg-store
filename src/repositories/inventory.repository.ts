export async function createInventory(
    db: any,
    inventoryData: any[]
) {
    return db.inventory.createMany({
        data: inventoryData,
        skipDuplicates: true
    });
}