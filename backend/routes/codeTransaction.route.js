import express from "express";
import { addToCart, fetchCart, removeCart } from "../controllers/codeTransaction.controller.js";
const router = express.Router();

router.get("/cart", fetchCart);
router.post("/cart", addToCart);
router.delete("/cart", removeCart);

export default router