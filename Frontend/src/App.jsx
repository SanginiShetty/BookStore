import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateBook from './pages/CreateBook'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import ShowBook from './pages/ShowBook'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path = '/' element = {} />
      <Route path = '/books/create' element = {} />
      <Route path = '/' element = {} />
      <Route path = '' element = {} />
      <Route path = '' element = {} />
    </Routes>
  )
}

export default App