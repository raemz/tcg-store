import { z } from "zod";

export const stockAdjustmentSchema = z.object({
    amount: z.number().int().positive()
});