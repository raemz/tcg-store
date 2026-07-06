import * as importService from "../services/import.service";

export async function importSet(c: any) {
    const code = c.req.param("code");

    const result = await importService.importSet(code);

    return c.json(result);
}