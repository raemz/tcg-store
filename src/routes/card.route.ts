import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { searchCards } from "../controllers/card.controller";

const cardRoutes = new OpenAPIHono();

const searchCardsRoutes = createRoute({
    method: "get",
    path: "/search",

    tags: ["Cards"],

    summary: "Search cards",

    request: {
        query: z.object({
            q: z.string(),
        }),
    },

    responses: {
        200: {
            description: "Search results",
        },
    },
});

cardRoutes.openapi(searchCardsRoutes, searchCards);

export default cardRoutes;