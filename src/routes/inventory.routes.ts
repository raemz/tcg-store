import { Hono } from "hono";
import { createInventory } from "../controllers/inventory.controller";

const inventoryRoutes = new Hono();

inventoryRoutes.post("/", createInventory)

export default inventoryRoutes;