import { z } from "@hono/zod-openapi";

export const createInventorySchema = z.object({
    variantId: z.number().int().openapi({
        example: 1,
    }),

    quantity: z.number().int().min(0).openapi({
        example: 20,
    }),

    costPrice: z.number().positive().openapi({
        example: 15.5,
    }),

    sellPrice: z.number().positive().openapi({
        example: 25,
    }),

    notes: z.string().optional().openapi({
        example: "First ",
    }),
});