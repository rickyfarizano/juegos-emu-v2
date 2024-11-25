import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameList from './pages/GameList';
import AddGame from './pages/AddGame';
import EditGames from './pages/EditGames';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DeveloperForm from './components/Developers';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/games" element={<GameList />} />
          <Route path="/add-game" element={<AddGame />} />
          <Route path="/edit-games" element={<EditGames />} />
          <Route path="/developers" element={<DeveloperForm />} />
          <Route path="/login" element={<LoginForm />} /> 
          <Route path="/register" element={<RegisterForm />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
