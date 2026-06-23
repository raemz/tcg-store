import {Hono} from "hono";
import inventoryRoutes from "./routes/inventory.routes";

const app = new Hono();

app.get("/", (c) => {
    return c.json({
        message: "TCG Store API Running"
    });
});

app.route("/inventory", inventoryRoutes);



export default app;