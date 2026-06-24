import { createSaleSchema } from "../validators/sale.validator";
import * as saleService from "../services/sale.service";

export async function createSale(c: any) {
    const body = await c.req.json();

    const validated = createSaleSchema.parse(body);

    const result = await saleService.createSale(validated);

    return c.json(result);
}

export async function getSales(c: any) {
    const result = await saleService.getSales();

    return c.json(result);
}

export async function getSaleById(c: any) {
    const id = Number(c.req.param("id"));

    const result = await saleService.getSaleById(id);

    return c.json(result);
}