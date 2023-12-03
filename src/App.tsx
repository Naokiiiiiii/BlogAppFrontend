// import './App.css'
import { Secured } from '@components/organisms/secured'
import { ArticleDetail } from '@components/pages/articleDetail'
import { Articles } from '@components/pages/articles'
import { Login } from '@components/pages/login'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/pages/home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Secured />}>
          <Route path="/home" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
