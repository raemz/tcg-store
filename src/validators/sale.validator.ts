import { z } from "zod";

export const createSaleSchema = z.object({
    // for multi sales
    items: z.array(
        z.object({
            variantId: z.number().int(),
            quantity: z.number().int().positive()
        })
    ).min(1)
});