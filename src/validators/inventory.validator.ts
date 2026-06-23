import { z } from "zod";

export const createInventorySchema = z.object({
    variantId: z.number().int(),
    quantity: z.number().int().min(0),
    costPrice: z.number().positive(),
    sellPrice: z.number().positive(),
    notes: z.string().optional()
});