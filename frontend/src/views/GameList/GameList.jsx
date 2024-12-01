import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../context/GameContext'; // Accedemos al contexto
import GameCard from '../../components/GameCard/GameCard'; // Importamos el componente GameCard

const GameList = () => {
  const { games } = useGameContext(); // Extraemos los juegos desde el contexto
  const [newGames, setNewGames] = useState([]);

  // Sincronizamos los juegos desde el contexto con el estado local
  useEffect(() => {
    setNewGames(games);
  }, [games]);

  return (
    <div className="min-h-screen flex flex-col items-start p-4">
      {/* Contenedor para los juegos alineado al inicio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Mapeamos los juegos para crear GameCard por cada juego */}
        {newGames.map((game) => (
          <div key={game._id} className="transition-opacity duration-500 opacity-100">
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
