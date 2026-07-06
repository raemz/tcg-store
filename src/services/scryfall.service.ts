import { scryfallClient } from "../clients/scryfall.client";
import { mapSet, mapCard } from "../mapper/scryfall.mapper";

export async function getSet(code: string) {
    const apiSet = await scryfallClient.getSet(code);

    return mapSet(apiSet);
}

export async function getCardsBySet(code: string) {
    let response = await scryfallClient.searchCardBySet(code);

    const cards = [];

    while(true) {
        cards.push(...response.data.map(mapCard));

        if(!response.has_more) {
            break;
        }

        response = await scryfallClient.getPage(response.next_page);
    }

    return cards;
}