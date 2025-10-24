import { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // State lưu thông tin người dùng và trạng thái

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true); // kiểm tra đang tải dữ liệu đăng nhập
    // Khi có token → tự động fetch thông tin user
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                // gọi API để lấy thông tin user hiện tại
                const userData = await authService.getUserById("me");
                setUser(userData);
            } catch (error) {
                console.error("Token không hợp lệ hoặc hết hạn:", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    // Hàm đăng nhập
    const login = async (credentials) => {
        try {
            const data = await authService.login(credentials);
            // Giả sử backend trả về { token, user }
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem("token", data.token);
            return { success: true };
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            return { success: false, message: error.response?.data?.message || "Đăng nhập thất bại" };
        }
    };

    //Hàm đăng ký

    const register = async (userData) => {
        try {
            const data = await authService.register(userData);
            return { success: true, data };
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            return { success: false, message: error.response?.data?.message || "Đăng ký thất bại" };
        }
    };

    // Hàm đăng xuất

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };


    // Giá trị chia sẻ cho toàn app

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                register,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
