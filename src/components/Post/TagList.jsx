
import React from "react";

const TagList = ({ tags }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">CHỦ ĐỀ</h2>
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
    );
};

export default TagList;