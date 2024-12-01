import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext'; // Accedemos al contexto de los juegos
import GameCard from '../../components/GameCard/GameCard'; // Componente que muestra cada juego

const SearchResults = () => {
  const { games } = useGameContext(); // Extraemos los juegos desde el contexto
  const [filteredGames, setFilteredGames] = useState([]);
  const location = useLocation();

  // Obtener el término de búsqueda desde la URL
  const query = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    if (query) {
      // Filtramos los juegos por el término de búsqueda
      const results = games.filter(game =>
        game.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredGames(results);
    } else {
      setFilteredGames([]); // Si no hay término de búsqueda, mostrar nada
    }
  }, [games, query]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
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
