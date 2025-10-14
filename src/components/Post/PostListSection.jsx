
import React from "react";
import PostCard from "./PostCard";

const PostListSection = ({ title, posts }) => {
    const isMusicSection = title === "Chủ đề âm nhạc";

    // Nếu là khối âm nhạc, cần thêm khoảng trống trên (mt-10)
    const containerClasses = isMusicSection ? "mt-10" : "";

    if (posts.length === 0) {
        return (
            <div className={containerClasses}>
                <h2 className={`text-2xl font-semibold mb-6 ${isMusicSection ? 'text-left' : 'text-center'}`}>
                    {title}
                </h2>
                <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
            </div>
        );
    }

    return (
        <div className={containerClasses}>
            <h2 className={`text-2xl font-semibold mb-6 ${isMusicSection ? 'text-left' : 'text-center'}`}>
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default PostListSection;