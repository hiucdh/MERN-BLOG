import express from "express";
import {
    register,
    login,
    getUsers,
    deleteUser,
    getUserById,
    getCurrentUser,
    editUser
} from "../controllers/authController.js";
import { checkToken, checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/me", checkToken, getCurrentUser);
router.get("/users/:id", getUserById);
router.get("/users", checkToken, checkAdmin, getUsers);
router.delete("/:id", checkToken, checkAdmin, deleteUser);
router.put("/:id", checkToken, checkAdmin, editUser);
export default router;
