import { createContext, useState, useEffect } from "react";
import { getPosts } from "../services/postService";
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
                const cachedPosts = localStorage.getItem("posts");
                console.log("Lấy bài viết thành công:", posts);
                if (cachedPosts) return;
                const postData = await getPosts();
                setPosts(postData);

                localStorage.setItem("posts", JSON.stringify(postData));

            } catch (error) {
                console.error("Lỗi khi lấy bài viết:", error);
            }
        };
        fetchPost();
    }, []);
    return (
        <PostContext.Provider
            value={{
                posts,
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

