// src/pages/GameList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import './GameList.css'; // Importar el CSS

const GameList = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/games');
        setGames(response.data);
        setFilteredGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    filterGames(searchValue, selectedGenre);
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    filterGames(searchTerm, genre);
  };

  const filterGames = (title, genre) => {
    let filtered = games;

    if (title) {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(title)
      );
    }

    if (genre) {
      filtered = filtered.filter((game) => game.genre === genre);
    }

    setFilteredGames(filtered);
  };

  return (
    <div className="game-list-container">
      <h2>Lista de Juegos</h2>

      <input
        type="text"
        placeholder="Buscar por título..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="genre-select"
      >
        <option value="">Todos los géneros</option>
        <option value="Acción">Acción</option>
        <option value="Aventura">Aventura</option>
        <option value="RPG">RPG</option>
        <option value="Deportes">Deportes</option>
      </select>

      <div className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => <GameCard key={game._id} game={game} />)
        ) : (
          <p>No se encontraron juegos.</p>
        )}
      </div>
    </div>
  );
};

export default GameList;
