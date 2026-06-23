import { createInventorySchema } from "../validators/inventory.validator";
import * as inventoryService from "../services/inventory.service";
import { stockAdjustmentSchema } from "../validators/stock.validator";
import { prisma } from "../db/prisma";


export async function createInventory(c: any) {
    const body = await c.req.json();

    const validated = createInventorySchema.parse(body);

    const result = await inventoryService.createInventory(validated);

    return c.json(result);
}

export async function increaseStock(c: any) {
    const id = Number(c.req.param("id"));
    const body = c.req.json();

    const validated = stockAdjustmentSchema.parse(body);

    const result = await inventoryService.increaseStock(
        id,
        validated.amount
    );

    return c.json(result);
}

export async function decreaseStock(c: any) {
    const id = Number(c.req.param("id"));
    const body = c.req.json();

    const validated = stockAdjustmentSchema.parse(body);

    const result = await inventoryService.decreaseStock(
        id,
        validated.amount
    );

    return c.json(result);
}

export async function getAllInventory(c: any) {
    const inventory = await inventoryService.getAllInvetory();

    return c.json(inventory)
}

export async function getInventoryById(c: any) {
    const id = Number(c.req.param("id"));
    const inventory = await inventoryService.getInventoryById(id);

    return c.json(inventory);
}

