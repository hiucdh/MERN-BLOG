import express from "express"
import Post from '../models/Post.js'

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { title, content, image, author } = req.body;
        const newPost = new Post({ title, content, image, author });
        await newPost.save()
        res.status(201).json({
            message: "Tạo post thành công",
            post: newPost,
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
export default router