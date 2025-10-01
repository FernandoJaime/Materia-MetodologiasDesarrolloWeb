import {
    createShopping,
    getShoppings,
    getShoppingDetail,
    getDetails
} from "../controllers/shoppingController";
import express from "express";
import { 
     CreateShoppingDto
} from "../dto/shoppingDto";
import validationMiddleware from "../middlewares/middleware";
import {
    verifyToken,
    requireRole
} from "../middlewares/auth";
import { get } from "http";

const router = express.Router();

router.post("/", verifyToken, validationMiddleware(CreateShoppingDto), createShopping);
router.get("/", verifyToken, getShoppings);
router.get("/details", verifyToken, getDetails);
router.get("/:id", verifyToken, getShoppingDetail);

export default router;