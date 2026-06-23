
import { prisma } from "../db/prisma";

export async function createInventory(data: any) {
    console.log(data);

    return {
        success: true
    };
}

export async function increaseStock(
    inventoryId: number,
    amount: number
) {
    const inventory = await prisma.inventory.update({
        where: {
            id: inventoryId
        },
        data: {
            quantity: {
                increment: amount
            }
        }
    });

    return inventory;
}

export async function decreaseStock(
    inventoryId: number,
    amount: number
) { // find dirst
    const currentInventory = await prisma.inventory.findUnique({
        where: {
            id: inventoryId
        }
    });

    if(!currentInventory) {
        throw new Error("Inventory not Found!");
    }

    if(currentInventory.quantity < amount) {
        throw new Error("Insufficient Stock!");
    }

    const inventory = await prisma.inventory.update({
        where: {
            id: inventoryId
        },
        data: {
            quantity: {
                decrement: amount
            }
        }
    });

    return inventory;
}

export async function getAllInvetory() {
    return prisma.inventory.findMany({
        include: {
            variant: {
                include: {
                    printing: {
                        include: {
                            cardSet: true
                        }
                    }
                }
            }
        }
    });
}

export async function getInventoryById(id: number) {
    return prisma.inventory.findUnique({
        where: {
            id
        },
        include: {
            variant: {
                include: {
                    printing: {
                        include: {
                            cardSet: true
                        }
                    }
                }
            }
        }
    });
}

export async function updateInventory(
    id: number,
    data: any
) {
    return prisma.inventory.update({
        where: {
            id
        },
        data
    })
}

export async function deleteInventory(id: number) {
    return prisma.inventory.delete({
        where: {
            id
        }
    })
}

