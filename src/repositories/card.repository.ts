import { prisma } from "../db/prisma";

export async function searchCards(query: string) {
    return prisma.cardVariant.findMany({
        where: {
            printing: {
                name: {
                    contains: query,
                    mode: "insensitive"
                },
            },
        },

        include: {
            printing: {
                include: {
                    cardSet: true,
                },
            },

            inventory: true,
        },

        take: 20,
    });
}