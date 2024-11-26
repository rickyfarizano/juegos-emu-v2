import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import GameList from './views/GameList/GameList';
import Developers from './views/Developers/Developers';
import GameDetails from './views/GameDetails/GameDetails';
import GameCategories from './views/Categories/GameCategories';
import Admin from './views/Admin/Admin';
import AbmDevelopers from './views/AbmDevelopers/AbmDevelopers';
import { GameProvider } from './context/GameContext'; // Asegúrate de que la ruta sea correcta
import { DeveloperProvider } from './context/DeveloperContext';

function App() {
  return (
    <GameProvider> {/* Envolvemos la aplicación con GameProvider */}
      <DeveloperProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/gameList" element={<GameList/>} />
          <Route path="/gameList/gameDetails/:id" element={<GameDetails/>} />
          <Route path="/categories" element={<GameCategories/>} />
          <Route path="/developers" element={<Developers/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/admin/developers" element={<AbmDevelopers/>} />
        </Routes>
        <Footer />
      </DeveloperProvider>
    </GameProvider>
  );
}

export default App;
