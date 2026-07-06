import { scryfallFetch } from "./scryfall.http"

export const scryfallClient = {
    async getSet(code: string) {
        return scryfallFetch(`/sets/${code}`);
    },

    // doesnt include the tokens, art series, minigames, alchemy variants mga extras
    async searchCardBySet(code: string) {
        return scryfallFetch(`/cards/search?q=set:${code}`);
    },

    async getPage(url: string) {
        return scryfallFetch(url);
    }
}

