import {
    createRole
} from "../controllers/roleController";
import express from "express";
import { 
    CreateRoleDto 
} from "../dto/roleDto";
import validationMiddleware from "../middlewares/middleware";
import {
    verifyToken,
    requireRole
} from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyToken, requireRole('68b76d11cc1bc4dda22667db'), validationMiddleware(CreateRoleDto), createRole);

export default router;