import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TAGS } from '../components/HomePage/PostList';
import { createPost } from "../services/postService";

const PostCreate = () => {
    const { token, loading, user } = useContext(AuthContext); // user chứa _id
    const navigate = useNavigate();

    // State form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [tag, setTag] = useState(TAGS[0] || '');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const handleLogin = () => navigate('/login');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            setError('Vui lòng nhập tiêu đề và nội dung!');
            return;
        }

        try {
            setSubmitting(true);
            setError('');
            const postData = { title, content, image, tag, author: user._id };
            const res = await createPost(postData, token);
            if (res.post._id) {
                navigate(`/posts/${res.post._id}`);
            }
        } catch (err) {
            console.error(err);
            setError('Không thể tạo bài viết. Vui lòng thử lại!');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="text-center flex flex-col items-center justify-center min-h-[70vh] px-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Bạn cần đăng nhập để tạo bài viết
                </h2>
                <button
                    onClick={handleLogin}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition-all duration-200"
                >
                    Đăng nhập ngay
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tạo bài viết mới</h2>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Tiêu đề bài viết"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <textarea
                        placeholder="Nội dung bài viết..."
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />

                    <input
                        type="text"
                        placeholder="Link ảnh (tùy chọn)"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <select
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {TAGS.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        disabled={submitting}
                        className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition-all duration-200 ${submitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {submitting ? 'Đang tạo...' : 'Tạo bài viết'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostCreate;
