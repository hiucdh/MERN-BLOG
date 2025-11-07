import { createContext, useState, useEffect, useContext } from 'react'
import { authService } from '../services/authService'
import { AuthContext } from './AuthContext'
export const UserContext = createContext()
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const { token } = useContext(AuthContext);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await authService.getUsers(token);
                setUserData(data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        };
        fetchUserData();
    }, [token]);
    const deleteUser = async (userId) => {
        try {
            await authService.deleteUser(userId, token);
            // Cập nhật lại danh sách người dùng sau khi xoá
            setUserData((prevData) => prevData.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Lỗi khi xoá người dùng:", error);
        }
    }
    const editUser = async (userId, userData) => {
        try {
            await authService.editUser(userId, userData, token);
            // Cập nhật lại danh sách người dùng sau khi chỉnh sửa
            setUserData((prevData) =>
                prevData.map((user) =>
                    user.id === userId ? { ...user, ...userData } : user
                )
            );
        } catch (error) {
            console.error("Lỗi khi chỉnh sửa người dùng:", error);
        }
    }
    return (
        <UserContext.Provider
            value={{
                userData,
                deleteUser,
                editUser,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}