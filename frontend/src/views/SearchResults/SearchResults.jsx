import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import GameCard from '../../components/GameCard/GameCard';

const SearchResults = () => {
  const { games = [] } = useGameContext();
  const [filteredGames, setFilteredGames] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('search') || ''; 

  useEffect(() => {
    if (query) {
      const cleanQuery = query.trim().toLowerCase();

      const results = games.filter(game => {
        const gameName = game.name ? game.name.toLowerCase() : '';
        const gameTitle = game.title ? game.title.toLowerCase() : '';

        // Filtramos si el nombre o el título contienen el término de búsqueda
        return gameName.includes(cleanQuery) || gameTitle.includes(cleanQuery);
      });

      setFilteredGames(results);
    } else {
      setFilteredGames([]);
    }
  }, [games, query]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Resultados de búsqueda para "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => <GameCard key={game._id} game={game} />)
        ) : (
          <p>No se encontraron juegos para "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
