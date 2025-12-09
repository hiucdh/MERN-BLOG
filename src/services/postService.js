// client/src/services/postService.js
import axios from "axios";

// Đặt URL cơ sở (base URL) để dễ dàng thay đổi khi triển khai
const API_BASE_URL = "http://localhost:8080/api";

// Cấu hình axios (có thể thêm token xác thực ở đây sau này)
const postApiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}` // Ví dụ: Thêm token JWT
    },
});

// --- 1. LẤY DỮ LIỆU (GET) ---
export const getPosts = async (tag = null) => {
    try {
        const url = tag ? `/posts?tag=${encodeURIComponent(tag)}` : `/posts`;
        const response = await postApiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
        throw error;
    }
};

export const getPostById = async (postId) => {
    try {
        const response = await postApiClient.get(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy bài viết ID ${postId}:`, error);
        throw error;
    }
};

// --- 2. TẠO, CẬP NHẬT, XÓA (CRUD) ---
export const createPost = async (postData, token) => {
    try {
        const response = await postApiClient.post("/posts", postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // hoặc response.data.post tùy backend
    } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error);
        throw error;
    }
};


export const updatePost = async (postId, updateData) => {
    try {
        const response = await postApiClient.put(`/posts/${postId}`, updateData);
        return response.data.post;
    } catch (error) {
        console.error(`Lỗi khi cập nhật bài viết ID ${postId}:`, error);
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const response = await postApiClient.delete(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi xóa bài viết ID ${postId}:`, error);
        throw error;
    }
};

// --- 3. TƯƠNG TÁC (Like/Comment) ---
export const toggleLike = async (postId, userId) => {
    try {
        const response = await postApiClient.post(`/posts/${postId}/like`, { userId });
        return response.data.likes;
    } catch (error) {
        console.error(`Lỗi khi cập nhật like cho bài viết ID ${postId}:`, error);
        throw error;
    }
};

/**
 * Thêm một bình luận mới vào bài viết.
 * Đã sửa endpoint để khớp với routes của bạn.
 */
export const addComment = async (postId, userId, content) => {
    try {
        const response = await postApiClient.post(`/posts/${postId}/comment`, { userId, content });
        return response.data.comments;
    } catch (error) {
        console.error(`Lỗi khi thêm comment vào bài viết ID ${postId}:`, error);
        throw error;
    }
};

/**
 * Xóa một bình luận khỏi bài viết.
 * Đã sửa endpoint để khớp với routes của bạn.
 */
export const deleteComment = async (postId, commentId) => {
    try {
        const response = await postApiClient.delete(`/posts/${postId}/comment/${commentId}`);
        return response.data.comments;
    } catch (error) {
        console.error(`Lỗi khi xóa comment ID ${commentId} khỏi bài viết ${postId}:`, error);
        throw error;
    }
};

// --- 4. CHỨC NĂNG QUẢN TRỊ (ADMIN) ---
export const approvePost = async (postId, status, token) => {
    try {
        const response = await postApiClient.put(`/posts/${postId}/approve`, { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.post;
    } catch (error) {
        console.error(`Lỗi khi phê duyệt bài viết ID ${postId}:`, error);
        throw error;
    }
};
// --- 5. LẤY BÀI VIẾT THEO TÁC GIẢ ---
export const getPostByAuthor = async (authorId) => {
    try {
        const response = await postApiClient.get(`/posts/author/${authorId}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy bài viết của tác giả ID ${authorId}:`, error);
        throw error;
    }
};
