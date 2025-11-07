import React from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './components/UI/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'
import PostCreate from './pages/PostCreate.jsx'
import PostDetail from './pages/PostDetail.jsx'
import TagPage from './pages/TagPage.jsx'
//admin
import AdminLayout from './admin/components/AdminLayout.jsx'
import Dashboard from './admin/pages/Dashboard.jsx'
import AdminUsers from './admin/pages/AdminUsers.jsx'
import AdminPosts from './admin/pages/AdminPosts.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<Register />} />
        <Route path="post-create" element={<PostCreate />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/tag/:tag" element={<TagPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/posts' element={<AdminPosts />} />
      </Route>
    </Routes>
  )
}

export default App