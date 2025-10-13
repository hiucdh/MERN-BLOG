import React, { useEffect, useState } from "react";
import axios from "axios";
import anhBacHo from "../assets/BacHo.png";
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [musicPosts, setMusicPosts] = useState([]);
    const tags = ["Quan điểm - Tranh luận",
        "Khoa học - Công nghệ",
        "Tài chính",
        "Thinking Out Loud",
        "Tâm lý học",
        "Âm nhạc",
        "Sự kiện Spiderum",
        "Điêu khắc Kiến trúc Mỹ thuật",
        "Người trong muôn nghề",
        "Game",
        "The Brands",
        "Giáo dục",
        "Thể thao",
        "Life style",
        "Fitness",
        "Ô tô",
        "Fashion",
        "Movie",
        "Phát triển bản thân",
        "Yêu",
        "Nấu ăn Ẩm thực",
        "WTF",
        "Nhiếp ảnh",
        "Sách",
        "Lịch sử",
        "Xe máy",
        "Du lịch",
        "Góc nhìn thời sự",
        "Sáng tác",
        "Chuyện thầm kín"];
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/posts")
            .then((res) => setPosts(res.data))
            .catch((err) => console.error(err));
        axios.get("http://localhost:8080/api/posts?tag=Âm nhạc")
            .then((res) => setMusicPosts(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Lấy 4 post đầu tiên
    const displayedPosts = posts.slice(0, 4);
    const displayedMusicPosts = musicPosts.slice(0, 4);
    const tenFeaturedPosts = posts.slice(0, 10);
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Danh sách bài viết</h2>
            {displayedPosts.length === 0 ? (
                <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {displayedPosts.map((post) => (
                        <div
                            key={post._id}
                            className="flex items-start gap-4 p-5 border rounded-xl shadow-sm hover:shadow-md transition duration-200 bg-white"
                        >
                            {/* Ảnh bên trái */}
                            <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Nội dung bên phải */}
                            <div className="flex flex-col justify-between">
                                <p className="text-sm text-gray-500 mb-1">
                                    👤 {post.author.username} | 🏷 {post.tag}
                                </p>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
                            </div>
                        </div>
                    ))}
                </div>


            )}
            <a
                href="https://www.youtube.com/playlist?list=PLmyF-BPWWPTIplH6faswUafil3eh9ApiX"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4"
            >
                <img
                    src={anhBacHo}
                    alt="Playlist về Bác Hồ"
                    className="rounded-lg shadow-md hover:shadow-lg transition"
                />
            </a>

            <div className="text-2xl font-semibold mb-6 text-left mt-10">
                <div className="">Chủ đề âm nhạc</div>
                {displayedMusicPosts.length === 0 ? (<p className="text-center text-gray-500">Chưa có bài viết nào.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {displayedMusicPosts.map((musicPosts) => (
                            <div
                                key={musicPosts._id}
                                className="flex items-start gap-4 p-5 border rounded-xl shadow-sm hover:shadow-md transition duration-200 bg-white"
                            >
                                {/* Ảnh bên trái */}
                                <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                                    <img
                                        src={musicPosts.image}
                                        alt={musicPosts.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Nội dung bên phải */}
                                <div className="flex flex-col justify-between">
                                    <p className="text-sm text-gray-500 mb-1">
                                        👤 {musicPosts.author.username} | 🏷 {musicPosts.tag}
                                    </p>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                                        {musicPosts.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">{musicPosts.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    {/* BÀI VIẾT NỔI BẬT */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 text-left">
                            BÀI VIẾT NỔI BẬT
                        </h2>
                        <div className="space-y-4">{tenFeaturedPosts.map((post) => (
                            <div
                                key={post._id}
                                className="flex items-start gap-4 p-5 border rounded-xl shadow-sm hover:shadow-md transition duration-200 bg-white"
                            >
                                {/* Ảnh bên trái */}
                                <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Nội dung bên phải */}
                                <div className="flex flex-col justify-between">
                                    <p className="text-sm text-gray-500 mb-1">
                                        👤 {post.author.username} | 🏷 {post.tag}
                                    </p>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
                                </div>
                            </div>
                        ))}</div>

                    </div>
                </div>

                <div className="lg:w-1/3">
                    {/* CHỦ ĐỀ */}
                    <div><h2 className="text-2xl font-semibold mb-6 text-center">CHỦ ĐỀ</h2>
                        <ul className="flex flex-wrap gap-4">
                            {tags.map((tag) => (
                                <li key={tag}>
                                    <a
                                        href={`http://localhost:5173/posts?tag=${encodeURIComponent(tag)}`}
                                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition"
                                    >
                                        {tag}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostList;
