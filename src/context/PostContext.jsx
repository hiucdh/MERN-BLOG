import { createContext, useState, useEffect } from "react";
import { getPosts, approvePost as approvePostService } from "../services/postService";
export const PostContext = createContext();
export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(
        localStorage.getItem("posts")
            ? JSON.parse(localStorage.getItem("posts"))
            : []
    );

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
    // duyet bai viet
    const approvePost = async (postId, status, token) => {
        try {
            const approvedPost = await approvePostService(postId, status, token);
            return { success: true, data: approvedPost };
        } catch (error) {
            console.error("Lỗi khi duyệt bài viết:", error);
        }
    }
    return (
        <PostContext.Provider
            value={{
                posts,
                approvePost,
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

