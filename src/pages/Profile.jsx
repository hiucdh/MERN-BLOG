import React from 'react'
import { AuthContext } from '../context/AuthContext'
const Profile = () => {
    const { user } = React.useContext(AuthContext);
    console.log(user)
    return (
        <div>
            Tên: {user.username} <br />
            Ngày tạo: {user.createdAt} <br />
            Vai trò: {user.role} <br />
            ID: {user._id} <br />
            Bài viết của tôi
        </div>
    )
}

export default Profile