import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Đăng ký
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username đã tồn tại" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashed,
            role: role || "user"
        });
        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Tài khoản đã tồn tại" });
        }
        res.status(500).json({ message: err.message });
    }
};

// Đăng nhập
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Đăng nhập thành công",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy danh sách user
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        let { id } = req.params;

        // Nếu id là "me" → lấy từ token
        if (id === "me") {
            id = req.user.id;
        }
        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Xóa user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

        await User.findByIdAndDelete(id);
        res.json({ message: "Xoá người dùng thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // không trả password
        if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};