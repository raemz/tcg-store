import { createRoute } from "@hono/zod-openapi";
import { createInventorySchema } from "../validators/inventory.validator";

export const createInventoryRoute = createRoute({
    method: "post",
    path: "/inventory",

    tags: ["Inventory"],

    summary: "Create inventory",

    request: {
        body: {
            content: {
                "application/json": {
                    schema: createInventorySchema,
                },
            },
        },
    },

    responses: {
        200: {
            description: "Inventory created successfully",
        },
    },
});