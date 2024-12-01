import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext'; // Accedemos al contexto de juegos
import GameCard from '../../components/GameCard/GameCard'; // Componente de tarjeta de juegos

const GameCategories = () => {
  const { genre } = useParams(); // Obtenemos el género de la URL
  const { games } = useGameContext(); // Accedemos al contexto de juegos
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const filterGamesByGenre = () => {
      setIsLoading(true); // Inicia la carga
      if (genre) {
        const filtered = games.filter((game) => 
          game.genre.toLowerCase() === genre.toLowerCase()
        );
        setFilteredGames(filtered);
      } else {
        setFilteredGames(games); // Si no hay género, mostramos todos
      }
      setIsLoading(false); // Finaliza la carga
    };

    filterGamesByGenre();
  }, [genre, games]);

  const genreTitle = genre 
    ? genre.charAt(0).toUpperCase() + genre.slice(1) 
    : 'Juegos';

  return (
    <div className="min-h-screen flex flex-col items-start p-4">
      {/* Título de la categoría */}
      <h1 className="text-3xl font-bold text-blue-700 text-center">
        {`Juegos de ${genreTitle}`}
      </h1>
      
      {isLoading ? (
        <p className="text-center mt-4">Cargando juegos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div key={game._id} className="transition-opacity duration-500 opacity-100">
                <GameCard game={game} />
              </div>
            ))
          ) : (
            <p className="text-center text-red-500 col-span-full">
              No se encontraron juegos en este género.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GameCategories;
