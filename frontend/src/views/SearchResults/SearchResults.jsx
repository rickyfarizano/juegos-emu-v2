import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Para acceder a la URL y parámetros
import { useGameContext } from '../../context/GameContext'; // Accedemos al contexto
import GameCard from '../../components/GameCard/GameCard'; // Componente que muestra cada juego

const SearchResults = () => {
  const { games = [] } = useGameContext(); // Extraemos los juegos desde el contexto, con valor por defecto vacío
  const [filteredGames, setFilteredGames] = useState([]);
  const location = useLocation(); // Usamos useLocation para acceder a la URL

  // Obtener el término de búsqueda desde la URL, normalizado (en minúsculas y sin espacios adicionales)
  const query = new URLSearchParams(location.search).get('search') || ''; 

  useEffect(() => {
    if (query) {
      // Limpiamos el término de búsqueda y lo pasamos a minúsculas
      const cleanQuery = query.trim().toLowerCase();

      // Filtramos los juegos por el nombre o el título, haciendo la comparación en minúsculas
      const results = games.filter(game => {
        const gameName = game.name ? game.name.toLowerCase() : '';  // Aseguramos que 'name' esté definido
        const gameTitle = game.title ? game.title.toLowerCase() : ''; // Aseguramos que 'title' esté definido

        // Filtramos si el nombre o el título contienen el término de búsqueda
        return gameName.includes(cleanQuery) || gameTitle.includes(cleanQuery);
      });

      setFilteredGames(results);
    } else {
      setFilteredGames([]); // Si no hay término de búsqueda, mostramos una lista vacía
    }
  }, [games, query]); // Dependemos de los juegos y el término de búsqueda

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
