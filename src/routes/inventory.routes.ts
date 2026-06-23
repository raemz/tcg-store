import { Hono } from "hono";
import { 
    createInventory,
    increaseStock,
    decreaseStock,
    getAllInventory,
    getInventoryById
} from "../controllers/inventory.controller";

const inventoryRoutes = new Hono();

inventoryRoutes.post("/", createInventory);
inventoryRoutes.patch(":id/increase", increaseStock);
inventoryRoutes.patch(":id/decrease", decreaseStock);
inventoryRoutes.get("/", getAllInventory);
inventoryRoutes.get("/:id", getInventoryById);

export default inventoryRoutes;