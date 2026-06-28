import { Hono } from "hono";
import { 
    createInventory,
    increaseStock,
    decreaseStock,
    getAllInventory,
    getInventoryById,
    getLowStock,
    searchInventory
} from "../controllers/inventory.controller";

const inventoryRoutes = new Hono();

inventoryRoutes.post("/", createInventory);
inventoryRoutes.patch(":id/increase", increaseStock);
inventoryRoutes.patch(":id/decrease", decreaseStock);
inventoryRoutes.get("/", getAllInventory);
inventoryRoutes.get("/:id", getInventoryById);
inventoryRoutes.get("/low-stock", getLowStock);
inventoryRoutes.get("/search", searchInventory);

export default inventoryRoutes;