import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from "../controllers/productController";
import express from "express";
import { 
    CreateProductDto,
    UpdateProductDto
} from "../dto/productDto";
import validationMiddleware from "../middlewares/middleware";
import {
    verifyToken,
    requireRole
} from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyToken, requireRole('68b76d11cc1bc4dda22667db'), validationMiddleware(CreateProductDto), createProduct);
router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProduct);
router.delete("/:id", verifyToken, requireRole('68b76d11cc1bc4dda22667db'), deleteProduct);
router.put("/:id", verifyToken, requireRole('68b76d11cc1bc4dda22667db'), validationMiddleware(UpdateProductDto), updateProduct);

export default router;