import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import GameList from './views/GameList/GameList';
import Developers from './views/Developers/Developers';
import DeveloperDetails from './views/DeveloperDetails/DeveloperDetails';
import GameDetails from './views/GameDetails/GameDetails';
import GameCategories from './views/Categories/GameCategories'; // Actualizamos esta ruta
import Admin from './views/Admin/Admin';
import AbmDevelopers from './views/AbmDevelopers/AbmDevelopers';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import { GameProvider } from './context/GameContext';
import { DeveloperProvider } from './context/DeveloperContext';
import SearchResults from './views/SearchResults/SearchResults';
function App() {
  return (
    <GameProvider> {/* Envolvemos la aplicación con GameProvider */}
      <DeveloperProvider>
        <Header />
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />

          {/* Rutas para los juegos */}
          <Route path="/gameList" element={<GameList />} />
          <Route path="/gameList/gameDetails/:id" element={<GameDetails />} />

          {/* Ruta para las categorías generales, que muestra todas las categorías */}
          <Route path="/categories" element={<GameCategories />} />

          {/* Ruta específica de categoría con el parámetro :genre */}
          <Route path="/category/:genre" element={<GameCategories />} />

          {/* Rutas de los desarrolladores y administración */}
          <Route path="/developers" element={<Developers />} />
          <Route path="/developers/developerDetails/:id" element={<DeveloperDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/search" element={<SearchResults />} /> 
          <Route path="/admin/developers" element={<AbmDevelopers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </DeveloperProvider>
    </GameProvider>
  );
}

export default App;
