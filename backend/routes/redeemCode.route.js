import express from "express";
import { types, variants } from "../controllers/redeemCode.controller.js";
const router = express.Router();

router.get("/types", types);
router.get("/variants", variants);


export default router