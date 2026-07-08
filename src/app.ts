import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import inventoryRoutes from "./routes/inventory.routes";
import saleRoutes from "./routes/sales.route";
import reportRoutes from "./routes/report.routes";
import scryfallRoutes from "./routes/scryfall.route";
import { errorHandler } from "./middleware/error.middleware";
import importRoutes from "./routes/import.routes";

const app = new OpenAPIHono();
app.doc("/doc", {
    openapi: "3.1.0",
    info: {
        title: "TCG Store API TEST",
        version: "1.0.0",
        description: "BACKEND TESTER"
    },
});
app.get("/docs", swaggerUI({url: "/doc"}));
console.log("http://localhost:3000/docs");

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
app.route("/scryfall", scryfallRoutes);
app.route("/import", importRoutes);




export default app;