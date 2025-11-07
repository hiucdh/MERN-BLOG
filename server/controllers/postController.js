import Post from "../models/Post.js";

// Tạo bài viết
export const createPost = async (req, res) => {
    try {
        const { title, content, image, author, likes, comments } = req.body;
        const newPost = new Post({ title, content, image, author, likes, comments });
        await newPost.save();
        res.status(201).json({ message: "Tạo post thành công", post: newPost });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy tất cả bài viết
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// lay 1 bai viet
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post không tồn tại" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Xóa bài viết
export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: "Post không tồn tại" });
        res.json({ message: "Xoá post thành công", post: deletedPost });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Cập nhật bài viết
export const updatePost = async (req, res) => {
    try {
        const { title, content, image, likes, comments } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, image, likes, comments },
            { new: true }
        );
        if (!updatedPost) return res.status(404).json({ message: "Post không tồn tại" });
        res.json({ message: "Cập nhật post thành công", post: updatedPost });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Like / Unlike
export const toggleLike = async (req, res) => {
    try {
        const { userId } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post không tồn tại" });

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }
        await post.save();
        res.json({ message: "Cập nhật lượt like thành công", likes: post.likes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Thêm comment
export const addComment = async (req, res) => {
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
};

// Xóa comment
export const deleteComment = async (req, res) => {
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
};
export const approvePost = async (req, res) => {
    try {
        const { status } = req.body; // "approved" hoặc "rejected"
        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Status không hợp lệ" });
        }

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post không tồn tại" });

        post.status = status;
        await post.save();

        res.json({ message: `Bài viết đã được ${status}`, post });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPostByAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;
        if (!authorId) {
            return res.status(400).json({ message: "Thiếu actorId" });
        }
        const posts = await Post.find({ author: authorId });
        return res.json({
            message: "Lấy bài viết thành công",
            posts
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
