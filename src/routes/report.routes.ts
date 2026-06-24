import { Hono } from "hono";
import { getSummary } from "../controllers/report.controller";

const reportRoutes = new Hono();

reportRoutes.get("/summary", getSummary);

export default reportRoutes;
