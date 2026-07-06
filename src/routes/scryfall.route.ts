import { Hono } from "hono";
import {
    getSet,
    getCardsBySet
} from "../controllers/scryfall.controller";

const scryfallRoutes = new Hono();

scryfallRoutes.get("/sets/:code", getSet);
scryfallRoutes.get("/cards/:code", getCardsBySet);

export default scryfallRoutes;
