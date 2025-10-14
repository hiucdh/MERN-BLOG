import { useState, useEffect } from "react";
import { getPosts } from "../services/postService";

export const useMusicPosts = () => {
    const [musicPosts, setMusicPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts("Âm nhạc");
                setMusicPosts(data);
            } catch (err) {
                setError("Lỗi khi tải bài viết.");
                console.error("Lỗi khi lấy bài viết:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { musicPosts, loading, error };
};