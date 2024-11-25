import { useCallback, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import Home from './views/Home/Home'
import GameList from './views/GameList/GameList'
import Developers from './views/Developers/Developers'
import GameDetails from './views/GameDetails/GameDetails'
import GameCategories from './views/Categories/GameCategories'
import Admin from './views/Admin/Admin'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/gameList" element={<GameList/>} />
        <Route path="/gameList/:id" element={<GameDetails/>} />
        <Route path="/categories" element={<GameCategories/>} />
        <Route path="/developers" element={<Developers/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </>
  )
}

export default App