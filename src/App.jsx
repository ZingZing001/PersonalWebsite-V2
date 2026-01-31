import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { Blog } from './pages/Blog.jsx'
import { BlogPost } from './pages/BlogPost.jsx'

function App() {
  return (
    <>
      {/* Defining Routes using the React Router package */}
      <BrowserRouter basename="/PersonalWebsite-V2">
        <Routes>
          {/* Scaffolding the pages */}
          <Route index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
