// client/src/hooks/usePosts.js

import { useState, useEffect } from "react";
import { getPosts } from "../services/postService";

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [musicPosts, setMusicPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allData = await getPosts();
                setPosts(allData);
                const musicData = await getPosts("Âm nhạc");
                setMusicPosts(musicData);
            } catch (err) {
                setError("Lỗi khi tải dữ liệu bài viết.");
                console.error("Lỗi tải dữ liệu:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Chỉ chạy một lần khi component mount

    return { posts, musicPosts, loading, error };
};