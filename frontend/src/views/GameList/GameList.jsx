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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
      {/* Mapeamos los juegos para crear GameCard por cada juego */}
      {newGames.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
