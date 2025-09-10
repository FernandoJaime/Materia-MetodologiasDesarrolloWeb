import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
    login
} from "../controllers/userController";
import express from "express";
import { 
    CreateUserDto, 
    UpdateUserDto 
} from "../dto/userDto";
import validationMiddleware from "../middlewares/middleware";
import {
    verifyToken,
    requireRole
} from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyToken, requireRole('68b76d11cc1bc4dda22667db'), validationMiddleware(CreateUserDto), createUser);
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.delete("/:id", verifyToken, requireRole('68b76d11cc1bc4dda22667db'), deleteUser);
router.put("/:id", verifyToken, requireRole('68b76d11cc1bc4dda22667db'), validationMiddleware(UpdateUserDto),updateUser);
router.post("/login", login);

export default router;