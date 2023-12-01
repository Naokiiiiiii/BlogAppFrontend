// import './App.css'
import { Secured } from '@components/organisms/secured'
import { Login } from '@components/pages/login'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Article } from './components/pages/articles'
import { Home } from './components/pages/home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Secured />}>
          <Route path="/home" element={<Home />} />
          <Route path="/articles" element={<Article />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
