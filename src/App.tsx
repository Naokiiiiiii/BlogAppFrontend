// import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Article } from './components/pages/articles';
import { Home } from './components/pages/home';

const App = () => {

  return (
    <div>
      <h1>Hello React Router v6</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Article />} />
      </Routes>
    </div>
  )
}

export default App
