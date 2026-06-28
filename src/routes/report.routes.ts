import { Hono } from "hono";
import { 
    getSummary,
    getDailySales
} from "../controllers/report.controller";

const reportRoutes = new Hono();

reportRoutes.get("/summary", getSummary);
reportRoutes.get("/daily", getDailySales);

export default reportRoutes;
