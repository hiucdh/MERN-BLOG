
import { useState, useEffect, useContext } from "react";
import { PostContext } from "../context/PostContext";
export const usePosts = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { posts } = useContext(PostContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!posts || posts.length === 0) {
                    setError("Chưa có bài viết nào được tải.");
                }

            } catch (err) {
                setError("Lỗi khi tải dữ liệu bài viết.");
                console.error("Lỗi tải dữ liệu:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [posts]);

    return { posts, loading, error };
};