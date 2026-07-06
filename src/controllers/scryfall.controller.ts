import * as scryfallService from '../services/scryfall.service';

export async function getSet(c: any) {
    const code = c.req.param("code");

    const result = await scryfallService.getSet(code);

    return c.json(result);
}

export async function getCardsBySet(c: any) {
    const code = c.req.param("code");

    const cards = await scryfallService.getCardsBySet(code);

    return c.json(cards);
}