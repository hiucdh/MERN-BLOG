import { createContext, useState, useEffect } from "react";
import { getPosts, approvePost as approvePostService, getPostByAuthor as fetchPostsByAuthorService } from "../services/postService";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(
        localStorage.getItem("posts")
            ? JSON.parse(localStorage.getItem("posts"))
            : []
    );

    // Lấy danh sách bài viết khi mount
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData = await getPosts();
                setPosts(postData);
                localStorage.setItem("posts", JSON.stringify(postData));
            } catch (error) {
                console.error("Lỗi khi lấy bài viết:", error);
            }
        };
        fetchPost();
    }, []);

    // Duyệt bài viết (admin)
    const approvePost = async (postId, status, token) => {
        try {
            const approvedPost = await approvePostService(postId, status, token);
            return { success: true, data: approvedPost };
        } catch (error) {
            console.error("Lỗi khi duyệt bài viết:", error);
        }
    };

    // Lấy bài viết theo tác giả
    const getPostByAuthor = async (authorId) => {
        try {
            const postData = await fetchPostsByAuthorService(authorId);
            return postData;
        } catch (error) {
            console.error("Lỗi khi lấy bài viết của tác giả:", error);
        }
    };

    return (
        <PostContext.Provider
            value={{
                posts,
                approvePost,
                getPostByAuthor,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
