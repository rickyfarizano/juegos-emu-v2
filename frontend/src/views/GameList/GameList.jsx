import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../context/GameContext'; // Accedemos al contexto

const GameList = () => {
  const { games } = useGameContext(); // Extraemos los juegos desde el contexto
  const [newGames, setNewGames] = useState([]);

  useEffect(() => {
    setNewGames(games); // Cuando `games` cambie, actualizamos `newGames`
  }, [games]);

  return (
    <div className="grid grid-cols-4 gap-4 m-4">
      {newGames.map((game, index) => (
        <div key={index} className="p-4 bg-blue-900">
          <img src={game.image} alt={game.title} />
          <h3>{game.title}</h3>
          <p>{game.genre}</p>
          <p>Peso del juego: {game.weight}</p>
          <p>Año de lanzamiento: {game.releaseYear}</p>
        </div>
      ))}
    </div>
  );
};

export default GameList;