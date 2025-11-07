import React from "react";
import { usePosts } from "../../hooks/usePosts"; // Giả sử bạn có custom hook để lấy bài viết
import PostListSection from "../Post/PostListSection";
import TagList from "../Post/TagList";
import PostCard from "../Post/PostCard"; // Dùng cho phần Bài viết nổi bật
import anhBacHo from "../../assets/BacHo.png"; // Đường dẫn ảnh quảng cáo
// Tags nên được định nghĩa ngoài component để tránh việc re-render không cần thiết
export const TAGS = [
    "Quan điểm - Tranh luận", "Khoa học - Công nghệ", "Tài chính", "Thinking Out Loud",
    "Tâm lý học", "Âm nhạc", "Sự kiện Spiderum", "Điêu khắc Kiến trúc Mỹ thuật",
    "Người trong muôn nghề", "Game", "The Brands", "Giáo dục", "Thể thao",
    "Life style", "Fitness", "Ô tô", "Fashion", "Movie", "Phát triển bản thân",
    "Yêu", "Nấu ăn Ẩm thực", "WTF", "Nhiếp ảnh", "Sách", "Lịch sử", "Xe máy",
    "Du lịch", "Góc nhìn thời sự", "Sáng tác", "Chuyện thầm kín"
];

const PostList = () => {
    // Sử dụng custom hook để lấy dữ liệu
    const { loading, error, posts } = usePosts();


    // Tính toán dữ liệu hiển thị (luôn dùng slice ở đây)
    const displayedPosts = posts.slice(0, 4);
    const tenFeaturedPosts = posts.slice(0, 10);

    if (loading) return <div className="text-center p-8">Đang tải dữ liệu...</div>;
    if (error) return <div className="text-center p-8 text-red-600">Lỗi: {error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <PostListSection title="Danh sách bài viết" posts={displayedPosts} />
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


            <div className="flex flex-col lg:flex-row gap-8 mt-10">

                {/* Cột 1: BÀI VIẾT NỔI BẬT */}
                <div className="lg:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-wide border-b-2 border-blue-500 pb-2">
                        BÀI VIẾT NỔI BẬT
                    </h2>
                    <div className="space-y-4">
                        {tenFeaturedPosts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>

                {/* Cột 2: CHỦ ĐỀ */}
                <div className="lg:w-1/3">
                    <TagList tags={TAGS} />
                </div>
            </div>
        </div>
    );
};

export default PostList;
