// import './App.css'
import { Secured } from '@components/organisms/secured'
import { Login } from '@components/pages/login'
import React from 'react'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Article } from './components/pages/articles'
import { Home } from './components/pages/home'
import { store } from './store'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Secured />}>
            <Route path="/home" element={<Home />} />
            <Route path="/articles" element={<Article />} />
          </Route>
        </Routes>
      </Provider>
    </div>
  )
}

export default App
