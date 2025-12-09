import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { getPostByAuthor } = useContext(PostContext);
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyPosts = async () => {
            if (!user?._id) return;

            try {
                const data = await getPostByAuthor(user._id);
                setMyPosts(Array.isArray(data?.posts) ? data.posts : []);
            } catch (err) {
                console.error("Lỗi khi lấy bài viết:", err);
                setMyPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMyPosts();
    }, [user, getPostByAuthor]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Thông tin người dùng */}
            <div className="mb-6 p-6 bg-white rounded-xl shadow-lg border">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Thông tin cá nhân</h2>
                <p><span className="font-semibold">Tên:</span> {user?.username}</p>
                <p><span className="font-semibold">Ngày tạo:</span> {new Date(user?.createdAt).toLocaleDateString()}</p>
                <p><span className="font-semibold">Vai trò:</span> {user?.role}</p>
                <p><span className="font-semibold">ID:</span> {user?._id}</p>
            </div>

            {/* Danh sách bài viết */}
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Bài viết của tôi</h3>

            {loading && <p>Đang tải bài viết...</p>}

            {!loading && myPosts.length === 0 && (
                <p className="text-gray-500">Bạn chưa có bài viết nào.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {myPosts.map((post) => (
                    <div key={post._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border">
                        {post.image && (
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-4">
                            <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
                            <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
                            {post.tag && (
                                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                    {post.tag}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
