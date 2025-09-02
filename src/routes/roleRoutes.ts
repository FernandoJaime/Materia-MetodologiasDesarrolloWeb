import {
    createRole
} from "../controllers/roleController";
import express from "express";
import { CreateRoleDto } from "../dto/roleDto";
import validationMiddleware from "../middlewares/middleware";

const router = express.Router();

router.post("/", validationMiddleware(CreateRoleDto), createRole);

export default router;