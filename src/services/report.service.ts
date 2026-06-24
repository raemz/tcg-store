import { prisma } from "../db/prisma";

export async function getSummary() {
    const sales = await prisma.sale.findMany({
        include: {
            items: true
        }
    });

    let revenue = 0;
    let cost = 0;

    for(const sale of sales) {
        revenue += Number(sale.total);

        for(const item of sale.items) {
            cost += Number(item.costPrice) * item.quantity;
        }
    }

    return {
        totalSales: sales.length,
        revenue,
        cost,
        profit: revenue - cost
    };
}