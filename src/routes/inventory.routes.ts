import { Hono } from "hono";
import { 
    createInventory,
    increaseStock,
    decreaseStock
} from "../controllers/inventory.controller";

const inventoryRoutes = new Hono();

inventoryRoutes.post("/", createInventory);
inventoryRoutes.patch(":id/increase", increaseStock);
inventoryRoutes.patch(":id/decrease", decreaseStock);

export default inventoryRoutes;