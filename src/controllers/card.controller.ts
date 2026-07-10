import * as cardService from "../services/card.service";

export async function searchCards(c: any) {
    const query = c.req.query("q");

    if(!query) {
        return c.json(
            {
                success: false,
                message: "Search query is required"
            },
            400
        );
    }

    const cards = await cardService.searchCard(query);
    
    return c.json({
        success: true,
        count: cards.length,
        data: cards,
    })

}