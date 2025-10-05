import express from "express";
import {
    createPost,
    getPosts,
    deletePost,
    updatePost,
    getPostById,
    toggleLike,
    addComment,
    deleteComment,
    approvePost
} from "../controllers/postController.js";

import { checkToken, checkAuthorOrAdmin, checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD Post
router.post("/", checkToken, createPost);             // chỉ user đã login mới được tạo
router.get("/", getPosts);                            // ai cũng xem được
router.get("/:id", getPostById);                      // ai cũng xem được
router.delete("/:id", checkToken, checkAuthorOrAdmin, deletePost); // chỉ admin,author xoá
router.put("/:id", checkToken, checkAuthorOrAdmin, updatePost);    // chỉ admin,author sửa

// Like / Comment
router.post("/:id/like", checkToken, toggleLike);
router.post("/:id/comment", checkToken, addComment);
router.delete("/:postId/comment/:commentId", checkToken, checkAuthorOrAdmin, deleteComment);
router.put("/:id/approve", checkToken, checkAdmin, approvePost); // cho phep admin duyet bai

export default router;