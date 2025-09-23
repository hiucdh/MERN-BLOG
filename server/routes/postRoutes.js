import express from "express"
import Post from '../models/Post.js'

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { title, content, image, author, likes, comments } = req.body;
        const newPost = new Post({ title, content, image, author, likes, comments });
        await newPost.save()
        res.status(201).json({
            message: "Tạo post thành công",
            post: newPost,
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: "Post không tồn tại" });
        res.json({ message: "Xoá post thành công", post: deletedPost });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { title, content, image, likes, comments } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, image, likes, comments },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post không tồn tại" });
        }

        res.json({
            message: "Cập nhật post thành công",
            post: updatedPost
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/:id/like", async (req, res) => {
    try {
        const { userId } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post không tồn tại" });

        //check xem user đã like hay chưa này
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id !== userId)
        } else {
            post.likes.push(userId)
        }
        await post.save()
        res.json({ message: "Cập nhật lượt like thành công", likes: post.likes });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post("/:id/comment", async (req, res) => {
    try {
        const { userId, content } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post không tồn tại" });

        const newComment = { user: userId, content };
        post.comments.push(newComment);
        await post.save();

        res.status(201).json({ message: "Thêm comment thành công", comments: post.comments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete("/:postId/comment/:commentId", async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post không tồn tại" });

        post.comments = post.comments.filter(c => c._id.toString() !== commentId);
        await post.save();

        res.json({ message: "Xóa comment thành công", comments: post.comments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router