import { importSetSchema } from "../validators/import.validator";
import * as importService from "../services/import.service";

export async function importSet(c: any) {
    const body = await c.req.json();
    const validated = importSetSchema.parse(body);
    const result = await importService.importSet(validated.setCode);

    return c.json(result);
}