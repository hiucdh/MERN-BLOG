import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const AdminUsers = () => {
    const { userData, deleteUser, editUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    // Xóa người dùng
    const handleDelete = async (id) => {
        await deleteUser(id);
        window.location.reload();
    };

    //  Lưu chỉnh sửa
    const handleEdit = async () => {
        if (!userToEdit) return;
        await editUser(userToEdit._id, userToEdit);
        setIsEditing(false);
        window.location.reload();
    };

    return (
        <div className="p-6">
            {userData ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Danh sách người dùng
                    </h2>
                    <ul className="divide-y divide-gray-200">
                        {userData.map((user) => (
                            <li
                                key={user._id}
                                className="flex items-center justify-between py-3"
                            >
                                <span className="text-gray-700">
                                    <span className="font-medium">{user.username}</span> — {user.email}
                                    <span className="text-sm text-gray-500 ml-2">
                                        (Vai trò: {user.role})
                                    </span>
                                </span>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setUserToEdit(user);
                                            setIsEditing(true);
                                        }}
                                        className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-500 rounded-xl shadow-sm hover:bg-indigo-600 transition-all duration-200"
                                    >
                                        Chỉnh sửa
                                    </button>

                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="px-4 py-1.5 text-sm font-medium text-white bg-red-500 rounded-xl shadow-sm hover:bg-red-600 transition-all duration-200"
                                    >
                                        Xoá
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-600">Đang tải danh sách người dùng...</p>
            )}

            {isEditing && userToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Chỉnh sửa người dùng</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Tên người dùng</label>
                                <input
                                    type="text"
                                    value={userToEdit.username || ""}
                                    onChange={(e) =>
                                        setUserToEdit({ ...userToEdit, username: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={userToEdit.email || ""}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                                />
                            </div>



                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all duration-200"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-500 rounded-xl hover:bg-indigo-600 transition-all duration-200"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
