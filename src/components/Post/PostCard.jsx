
import React from "react";

const PostCard = ({ post }) => {
    // Đảm bảo post.author tồn tại trước khi truy cập username
    const authorName = post.author?.username || "Ẩn danh";

    return (
        <div
            key={post._id}
            className="flex items-start gap-4 p-5 border rounded-xl shadow-sm hover:shadow-md transition duration-200 bg-white"
        >
            {/* Ảnh bên trái */}
            <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Nội dung bên phải */}
            <div className="flex flex-col justify-between">
                <p className="text-sm text-gray-500 mb-1">
                    👤 {authorName} | 🏷 {post.tag}
                </p>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
            </div>
        </div>
    );
};

export default PostCard;