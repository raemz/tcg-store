import { prisma } from "../db/prisma";
import { Prisma } from "../../generated/prisma/client";

export type CardSearchResult = Prisma.CardVariantGetPayload<{
    include: {
        printing: {
            include: {
                cardSet: true;
            };
        };
        inventory: true;
    }
}>

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