import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-16">
            <div className="max-w-4xl bg-white rounded-2xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                    Về Blog của Chúng Tôi
                </h1>

                <p className="text-gray-700 text-lg mb-4">
                    Chào mừng bạn đến với trang blog của chúng tôi! Đây là nơi chúng tôi chia sẻ kiến thức, cập nhật tin tức, và những quan điểm về nhiều lĩnh vực khác nhau.
                </p>

                <p className="text-gray-700 text-lg mb-4">
                    Từ công nghệ, khoa học, âm nhạc, đến lifestyle và văn hóa, blog của chúng tôi luôn cập nhật thông tin mới nhất, giúp bạn mở rộng tầm nhìn và học hỏi mỗi ngày.
                </p>

                <p className="text-gray-700 text-lg mb-4">
                    Chúng tôi cũng khuyến khích bạn tham gia bình luận, trao đổi ý kiến và cùng cộng đồng khám phá những chủ đề thú vị.
                </p>

                <p className="text-gray-700 text-lg mb-6">
                    Cảm ơn bạn đã ghé thăm! Hãy đăng ký theo dõi để không bỏ lỡ những bài viết mới nhất từ chúng tôi.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="mailto:hieunguyenhuuhuu@gmail.com"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Liên hệ
                    </a>
                    <a
                        href="/"
                        className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition"
                    >
                        Về trang chủ
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
