import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { Blog } from './pages/Blog.jsx'
import { BlogPost } from './pages/BlogPost.jsx'
import { AskMe } from './pages/AskMe.jsx'
import { Admin } from './pages/Admin.jsx'
import { ScrollToTop } from './components/ScrollToTop.jsx'

function App() {
  return (
    <>
      {/* Defining Routes using the React Router package */}
      <BrowserRouter basename="/PersonalWebsite-V2">
        <ScrollToTop />
        <Routes>
          {/* Scaffolding the pages */}
          <Route index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/ask-me" element={<AskMe />} />
          {/* Unlisted admin analytics (token-gated client-side; data is token-gated server-side) */}
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
