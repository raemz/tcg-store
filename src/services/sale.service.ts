import { totalmem } from "node:os";
import { prisma } from "../db/prisma";
import { success } from "zod";
import { Decimal } from "@prisma/client/runtime/client";

export async function createSale(data: any) {
    let total = 0;
    const saleItemsData: { variantId: any; quantity: any; costPrice: Decimal; sellPrice: Decimal; }[] = [];

    for(const item of data.items) {
        const inventory = await prisma.inventory.findUnique({
            where: {
                variantId: item.variantId
            }
        });

        if(!inventory) {
            throw new Error(`Inventory not found for variant ${item.variantId}`);
        }

        if(inventory.quantity < item.quantity) {
            throw new Error(`Insufficient stock for variant ${item.variantId}`);
        }

        total += Number(inventory.sellPrice) * item.quantity;

        saleItemsData.push({
            variantId: item.variantId,
            quantity: item.quantity,
            costPrice: inventory.costPrice,
            sellPrice: inventory.sellPrice
        });
    }

    const result = await prisma.$transaction(async (tx) => {
        const sale = await tx.sale.create({
            data: {
                total
            }
        });

        await tx.saleItem.createMany({
            data: saleItemsData.map(item => ({
                saleId: sale.id,
                variantId: item.variantId,
                quantity: item.quantity,
                costPrice: item.costPrice,
                sellPrice: item.sellPrice
            }))
        });
        
        for(const item of saleItemsData) {
            
            await tx.inventory.update({
                where: {
                    variantId: item.variantId
                },
                data: {
                    quantity: {
                        decrement: item.quantity
                    }
                }
            });
        }

        return {
            success: true,
            saleId: sale.id,
            total
        };
    });

    return result;
}

export async function getSales() {
    return prisma.sale.findMany({
        orderBy: {
            soldAt: "desc"
        }
    });
}

export async function getSaleById(id: number) {
    return prisma.sale.findUnique({
        where: {
            id
        },
        include: {
            items: {
                include: {
                    variant: {
                        include: {
                            printing: true
                        }
                    }
                }
            }
        }
    });
}