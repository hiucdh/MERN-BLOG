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
                // 1. Gộp tất cả các promise vào Promise.all để chạy SONG SONG
                const [allData, musicData] = await Promise.all([
                    getPosts(),
                    getPosts("Âm nhạc")
                ]);

                // 2. CHỈ setState một lần duy nhất sau khi lấy được tất cả dữ liệu
                // Điều này giảm thiểu re-render và tránh lỗi lag
                setPosts(allData);
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