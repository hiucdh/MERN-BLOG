import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    tag: {
        type: String,
        enum: [
            "Quan điểm - Tranh luận",
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
            "Chuyện thầm kín"
        ],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            content: String,
            createdAt: { type: Date, default: Date.now },
        },
    ],
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
