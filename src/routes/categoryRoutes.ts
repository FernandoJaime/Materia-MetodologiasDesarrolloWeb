import {
    createCategory
} from "../controllers/categoryController";
import express from "express";
import { 
    CreateCategoryDto 
} from "../dto/categoryDto";
import validationMiddleware from "../middlewares/middleware";
import {
    verifyToken,
    requireRole
} from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyToken, requireRole('68b76d11cc1bc4dda22667db'), validationMiddleware(CreateCategoryDto), createCategory);

export default router;