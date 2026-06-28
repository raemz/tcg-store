import * as reportService from "../services/report.service";

export async function getSummary(c: any) {
    const result = await reportService.getSummary();

    return c.json(result);
}

export async function getDailySales(c: any) {

    const result =
        await reportService.getDailySales();

    return c.json(result);
}