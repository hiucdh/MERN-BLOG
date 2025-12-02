import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    const authorName = post.author?.username || "Ẩn danh";

    return (
        <Link
            to={`/posts/${post._id}`}
            state={post} // truyen du lieu
            className="block"
        >
            <div
                className="flex items-start gap-4 p-5 border rounded-xl shadow-sm hover:shadow-md transition duration-200 bg-white"
            >
                {/* Ảnh bên trái */}
                {/* <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                        loading="lazy"
                        src={post.image || '/placeholder.png'}
                        alt={post.title}
                        onError={(e) => { e.target.src = '/placeholder.png'; }}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div> */}

                {/* Nội dung bên phải */}
                <div className="flex flex-col justify-between">
                    <p className="text-sm text-gray-500 mb-1">
                        👤 {authorName} | 🏷 {post.tag}
                    </p>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                        {post.content}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default React.memo(PostCard);
