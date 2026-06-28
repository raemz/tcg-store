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

export async function getDailySales() {

    const start = new Date();

    start.setHours(0, 0, 0, 0);

    const end = new Date();

    end.setHours(23, 59, 59, 999);

    const sales =
        await prisma.sale.findMany({
            where: {
                soldAt: {
                    gte: start,
                    lte: end
                }
            },
            include: {
                items: true
            }
        });

    let revenue = 0;
    let cost = 0;

    for (const sale of sales) {

        revenue += Number(sale.total);

        for (const item of sale.items) {
            cost +=
                Number(item.costPrice) *
                item.quantity;
        }
    }

    return {
        date: start,
        salesCount: sales.length,
        revenue,
        profit: revenue - cost
    };
}