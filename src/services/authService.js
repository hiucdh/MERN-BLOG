import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/auth";
const authApiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
// Interceptor: tự thêm Authorization header nếu có token
authApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// lay user: phai token admin moi duoc
export const getUsers = async (token) => {
    /* 
    const response = await postApiClient.post("/posts", postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        */
    try {
        const response = await authApiClient.get(`/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        throw error;
    }
}
//lay user theo id
export const getUserById = async (userId) => {
    try {
        if (userId === "me") {
            const response = await authApiClient.get(`/users/me`);
            return response.data;
        }
        const response = await authApiClient.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy người dùng ID ${userId}:`, error);
        throw error;
    }
}
//dang ki
export const register = async (userData) => {
    try {
        const response = await authApiClient.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        throw error;
    }
}
//dang nhap
export const login = async (credentials) => {
    try {
        const response = await authApiClient.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        throw error;
    }
}
//xoa user
const deleteUser = async (userId, token) => {
    try {
        const response = await authApiClient.delete(`/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi xoá người dùng ID ${userId}:`, error);
        throw error;
    }
}
//chinh sua user
const editUser = async (userId, userData, token) => {
    try {
        const response = await authApiClient.put(`/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi chỉnh sửa người dùng ID ${userId}:`, error);
        throw error;
    }
}
const authService = {
    login,
    editUser,
    register,
    getUsers,
    getUserById,
    deleteUser
};

export { authService };