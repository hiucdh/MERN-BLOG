import React, { useRef } from "react";
import { useMusicPosts } from "../../hooks/useMusicPosts";
import { useSlider } from "../../hooks/useSlider";
import { useContainerWidth } from "../../hooks/useContainerWidth";
import { Link } from "react-router";
const Thumbnail = () => {
    const galleryRef = useRef(null);

    // Sử dụng các hooks
    const { musicPosts, loading, error } = useMusicPosts();
    const { index, next, prev, goto } = useSlider(musicPosts.length);
    const containerWidth = useContainerWidth(galleryRef);

    if (loading) {
        return <div className="flex justify-center items-center h-96"><p>Đang tải bài viết...</p></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-96"><p>Đã xảy ra lỗi khi tải dữ liệu.</p></div>;
    }

    if (musicPosts.length === 0) {
        return <div className="flex justify-center items-center h-96"><p>Không có bài viết nào về Âm nhạc.</p></div>;
    }

    const currentPost = musicPosts[index];

    return (
        <div className="flex flex-col items-center justify-center bg-white pt-4 pb-10 px-4">
            <div
                ref={galleryRef}
                className="gallery w-full max-w-5xl border-2 rounded bg-white shadow-lg overflow-hidden"
            >
                {/* Thanh tiêu đề */}
                <div className="flex items-center justify-between p-3 border-b select-none">
                    <div className="text-gray-800 font-semibold pl-3">
                        {currentPost.title}
                    </div>
                    <div className="flex text-gray-600">
                        <button
                            onClick={prev}
                            className="w-7 border-2 border-gray-300 rounded-l-lg p-1 cursor-pointer hover:bg-gray-100 disabled:opacity-30"
                            disabled={index === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            className="w-7 border-2 border-gray-300 rounded-r-lg p-1 cursor-pointer hover:bg-gray-100 disabled:opacity-30"
                            disabled={index === musicPosts.length - 1}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Vùng slide */}
                <div className="relative h-96 overflow-hidden">
                    <div
                        className="flex-none flex flex-col md:flex-row w-full h-full p-6"
                    >
                        <div className="md:w-2/3 flex justify-center items-center mb-4 md:mb-0">
                            <img src={currentPost.image} alt={currentPost.title} className="max-h-80 object-contain rounded" />
                        </div>

                        <div className="md:w-1/3 flex flex-col justify-center text-center md:text-left">
                            <Link to={`/posts/${currentPost._id}`}><h2 className="text-2xl font-bold mb-3">{currentPost.title}</h2>
                                <p className="text-gray-700 text-sm leading-relaxed">{currentPost.content}</p></Link>
                            <div className="mt-3 flex gap-2 flex-wrap justify-center md:justify-start">
                                {index > 0 && (
                                    <button
                                        onClick={() => goto(0)}
                                        className="border border-gray-400 text-sm font-semibold px-2 py-1 rounded hover:bg-gray-100"
                                    >
                                        Goto First
                                    </button>
                                )}
                                {index < musicPosts.length - 1 && (
                                    <button
                                        onClick={() => goto(musicPosts.length - 1)}
                                        className="border border-gray-400 text-sm font-semibold px-2 py-1 rounded hover:bg-gray-100"
                                    >
                                        Goto Last
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thumbnail;