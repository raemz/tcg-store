import * as cardRepository from "../repositories/card.repository";
import { toCardSearchDTO } from "../mapper/card.mapper";

export async function searchCard(query: string) {
    const cards = await cardRepository.searchCards(query);

    return cards.map(toCardSearchDTO);
}