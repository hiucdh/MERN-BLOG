import React from 'react'
import { PostContext } from '../../context/PostContext'
const AdminPosts = () => {
    const { posts } = React.useContext(PostContext)
    console.log(posts)
    return (
        <div>AdminPosts</div>
    )
}

export default AdminPosts