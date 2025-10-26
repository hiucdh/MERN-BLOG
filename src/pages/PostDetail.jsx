import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getPostById } from "../services/postService";

const PostDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Nếu người dùng đến từ PostCard thì location.state sẽ có sẵn dữ liệu
    const initialPost = location.state || null;

    const [post, setPost] = useState(initialPost);
    const [loading, setLoading] = useState(!initialPost);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Nếu chưa có post (vào thẳng URL), mới cần gọi API
        if (!post) {
            const fetchPost = async () => {
                try {
                    setLoading(true);
                    const data = await getPostById(id);
                    setPost(data);
                } catch (err) {
                    setError("Không thể tải bài viết.");
                } finally {
                    setLoading(false);
                }
            };
            fetchPost();
        }
    }, [id, post]);

    if (loading) {
        return (
            <div className="text-center text-gray-500 py-20">Đang tải bài viết...</div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    Quay lại trang chủ
                </button>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center py-20 text-gray-500">
                Không tìm thấy bài viết.
            </div>
        );
    }

    const authorName = post.author?.username || "Ẩn danh";

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
            {/* Ảnh */}
            <img
                src={post.image || "/placeholder.png"}
                alt={post.title}
                className="w-full h-80 object-cover rounded-lg mb-6"
                onError={(e) => {
                    e.target.src = "/placeholder.png";
                }}
                loading="lazy"
            />

            {/* Tiêu đề */}
            <h1 className="text-3xl font-bold mb-3">{post.title}</h1>

            {/* Thông tin */}
            <p className="text-gray-500 text-sm mb-4">
                👤 {authorName} | 🏷 {post.tag}{" "}
                {post.createdAt && (
                    <>| 📅 {new Date(post.createdAt).toLocaleDateString("vi-VN")}</>
                )}
            </p>

            {/* Nội dung */}
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
            </div>

            {/* Nút quay lại */}
            <div className="mt-10">
                <button
                    onClick={() => navigate(-1)}
                    className="px-5 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                    ← Quay lại
                </button>
            </div>
        </div>
    );
};

export default PostDetail;
