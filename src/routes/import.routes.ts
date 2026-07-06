import { Hono } from "hono";
import { importSet } from "../controllers/import.controller";

const importRoutes = new Hono();

importRoutes.post("/set/:code", importSet);

export default importRoutes;