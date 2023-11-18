// import './App.css'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Article } from './components/pages/articles'
import { Home } from './components/pages/home'
import { store } from './store'

const App = () => {
  return (
    <div>
      <h1>Hello React Router v6</h1>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Article />} />
        </Routes>
      </Provider>
    </div>
  )
}

export default App
