import { Hono } from "hono";
import { 
    createSale,
    getSales,
    getSaleById
} from "../controllers/sale.controller";

const saleRoutes = new Hono();

saleRoutes.post("/", createSale);
saleRoutes.get("/", getSales);
saleRoutes.get("/:id", getSaleById);

export default saleRoutes;

