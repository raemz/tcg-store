import {Hono} from "hono";
import inventoryRoutes from "./routes/inventory.routes";
import saleRoutes from "./routes/sales.route";
import reportRoutes from "./routes/report.routes";

const app = new Hono();

app.get("/", (c) => {
    return c.json({
        message: "TCG Store API Running"
    });
});

app.route("/inventory", inventoryRoutes);
app.route("/sales", saleRoutes);
app.route("/reports", reportRoutes);





export default app;