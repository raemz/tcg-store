
import { prisma } from "../db/prisma";


export async function createInventory(data: any) {
    console.log(data);

    return {
        success: true
    };
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

