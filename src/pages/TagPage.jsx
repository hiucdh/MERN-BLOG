import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getPosts } from "../services/postService";
import PostListSection from '../components/Post/PostListSection';
const TagPage = () => {
    const { tag } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostsByTag = async () => {
            try {
                setLoading(true);
                const allPosts = await getPosts(tag);
                setPosts(allPosts);
            } catch (err) {
                console.error("Lỗi khi tải bài viết theo tag:", err);
                setError("Không thể tải bài viết.");
            } finally {
                setLoading(false);
            }
        };

        fetchPostsByTag();
    }, [tag]);

    if (loading) return <p className="text-center py-10">Đang tải...</p>;
    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
    if (posts.length === 0) return <p className="text-center py-10">Không có bài viết nào.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <PostListSection title={`Bài viết với tag: ${tag}`} posts={posts} />
        </div>
    );
};

export default TagPage;
