import React from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './components/UI/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PostCreate from './pages/PostCreate.jsx'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="post-create" element={<PostCreate />} />
      </Route>
    </Routes>
  )
}

export default App