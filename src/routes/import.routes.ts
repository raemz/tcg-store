import { Hono } from "hono";
import { importSet } from "../controllers/import.controller";

const importRoutes = new Hono();

importRoutes.post("/", importSet);

export default importRoutes;