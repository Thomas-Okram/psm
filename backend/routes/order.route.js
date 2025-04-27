import express from "express";
import { fetchOrder, newOrder, unholdDev } from "../controllers/order.controller.js";
const router = express.Router();

router.get("/order", fetchOrder);
router.post("/order", newOrder);
router.post("/order/dev", unholdDev);

export default router;