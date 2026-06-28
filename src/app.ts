import {Hono} from "hono";
import inventoryRoutes from "./routes/inventory.routes";
import saleRoutes from "./routes/sales.route";
import reportRoutes from "./routes/report.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = new Hono();

app.use("*", async (c, next) => {

    try {
        await next();
    } catch (err) {
        const response = errorHandler(err);

        return c.json(
            response.body,
            response.status 
        );
    }
})

app.get("/", (c) => {
    return c.json({
        message: "TCG Store API Running"
    });
});

app.route("/inventory", inventoryRoutes);
app.route("/sales", saleRoutes);
app.route("/reports", reportRoutes);





export default app;