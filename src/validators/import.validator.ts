import { z } from "zod";

export const importSetSchema = z.object({
    setCode: z.string().trim().min(1),
})