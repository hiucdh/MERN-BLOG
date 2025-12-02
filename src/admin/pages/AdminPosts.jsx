import React from 'react'
import { PostContext } from '../../context/PostContext'
import { Link } from 'react-router-dom'
export default function AdminPosts() {
    const { posts } = React.useContext(PostContext)

    // Helper để format ngày an toàn
    const formatDate = (iso) => {
        try {
            const d = new Date(iso)
            if (isNaN(d)) return ''
            return d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        } catch {
            return ''
        }
    }

    const pendingPosts = Array.isArray(posts) ? posts.filter(p => p?.status === 'pending') : []
    const approvedPosts = Array.isArray(posts) ? posts.filter(p => p?.status === 'approved') : []

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Danh sách bài viết</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pending column */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold mb-2 text-yellow-600">
                        Đang chờ duyệt (Pending) <span className="text-sm text-gray-500">({pendingPosts.length})</span>
                    </h2>

                    {pendingPosts.length === 0 ? (
                        <p className="text-gray-500">Không có bài viết pending.</p>
                    ) : (
                        pendingPosts.map((post) => (
                            <Link to={`/posts/${post._id}`} state={post}>
                                <article
                                    key={post?._id ?? Math.random()}
                                    className="mb-2 bg-white shadow-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition"
                                >
                                    {/* {post?.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title ?? 'post image'}
                                        className="w-full h-36 object-cover rounded-md mb-3"
                                    />
                                )} */}

                                    <h3 className="text-lg text-gray-600 font-semibold mb-1">{post?.title ?? 'Untitled'}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{post?.tag ?? ''}</p>
                                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">{post?.content ?? ''}</p>

                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>Trạng thái: <strong className="lowercase">{post?.status ?? '—'}</strong></span>
                                        <span>{formatDate(post?.createdAt ?? post?.updatedAt)}</span>
                                    </div>
                                </article></Link>


                        ))
                    )}
                </section>

                {/* Approved column */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold mb-2 text-green-600">
                        Đã duyệt (Approved) <span className="text-sm text-gray-500">({approvedPosts.length})</span>
                    </h2>

                    {approvedPosts.length === 0 ? (
                        <p className="text-gray-500">Không có bài viết approved.</p>
                    ) : (
                        approvedPosts.map((post) => (
                            <article
                                key={post?._id ?? Math.random()}
                                className="mb-2 bg-white shadow-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition"
                            >
                                {/* {post?.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title ?? 'post image'}
                                        className="w-full h-36 object-cover rounded-md mb-3"
                                    />
                                )} */}

                                <h3 className="text-lg font-semibold mb-1">{post?.title ?? 'Untitled'}</h3>
                                <p className="text-sm text-gray-600 mb-2">{post?.tag ?? ''}</p>
                                <p className="text-gray-700 text-sm mb-3 line-clamp-3">{post?.content ?? ''}</p>

                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>Trạng thái: <strong className="lowercase">{post?.status ?? '—'}</strong></span>
                                    <span>{formatDate(post?.createdAt ?? post?.updatedAt)}</span>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </div>
        </div>
    )
}
