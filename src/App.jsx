import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { NotFound } from './pages/NotFound.jsx'

function App() {
  return (
    <>
      {/* Defining Routes using the React Router package */}
      <BrowserRouter>
        <Routes>
          {/* Scaffolding the two pages */}
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
