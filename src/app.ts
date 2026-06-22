import {Hono} from "hono";

const app = new Hono();

app.get("/", (c) => {
    return c.json({
        message: "TCG Store API Running"
    });
});

export default app;