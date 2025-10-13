import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Kiểm tra token
export const checkToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Không có token" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ message: "Người dùng không tồn tại" });
        }

        next();
    } catch (err) {
        res.status(401).json({ message: "Token không hợp lệ" });
    }
};

// Chỉ cho admin
export const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Không có quyền admin" });
    }
};

import Post from "../models/Post.js";

export const checkAuthorOrAdmin = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post không tồn tại" });
        }
        const userId = req.user.id;
        const userRole = req.user.role;

        if (userRole === "admin" || post.author.toString() === userId) {
            return next();
        } else {
            return res.status(403).json({ message: "Bạn không có quyền thực hiện hành động này" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
