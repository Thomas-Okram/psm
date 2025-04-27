import express from  "express";
import { adminVariants, adminPriceUpdate, adminUpload, adminRemove, adminViewCodes, adminViewUsers } from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/variants", adminVariants)
router.post("/variants/priceUpdate", adminPriceUpdate)

router.post("/upload", adminUpload);
router.delete("/remove", adminRemove);
router.get("/viewCodes", adminViewCodes);
router.get("/viewUsers", adminViewUsers);


export default router;