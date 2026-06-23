import { createInventorySchema } from "../validators/inventory.validator";
import * as inventoryService from "../services/inventory.service";


export async function createInventory(c: any) {
    const body = await c.req.json();

    const validated = createInventorySchema.parse(body);

    const result = await inventoryService.createInventory(validated);

    return c.json(result);
}