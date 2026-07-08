import { createInventorySchema } from "../validators/inventory.validator";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { 
    createInventory,
    increaseStock,
    decreaseStock,
    getAllInventory,
    getInventoryById,
    getLowStock,
    searchInventory
} from "../controllers/inventory.controller";

const inventoryRoutes = new OpenAPIHono();

const createInventoryRoute = createRoute({
    method: "post",
    path: "/",
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

inventoryRoutes.openapi(createInventoryRoute, createInventory);

inventoryRoutes.post("/", createInventory);
inventoryRoutes.patch(":id/increase", increaseStock);
inventoryRoutes.patch(":id/decrease", decreaseStock);
inventoryRoutes.get("/", getAllInventory);
inventoryRoutes.get("/:id", getInventoryById);
inventoryRoutes.get("/low-stock", getLowStock);
inventoryRoutes.get("/search", searchInventory);

export default inventoryRoutes;