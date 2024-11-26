// src/views/GameList/GameList.jsx

import React from 'react';
import { useGameContext } from '../../context/GameContext'; // Importar el hook para acceder al contexto
import { useState, useEffect } from 'react';

const GameList = () => {
  const { games } = useGameContext(); // Acceder al estado de los juegos desde el contexto
  const [newGames, setNewGames] = useState([]);

  useEffect(() => {
    setNewGames(games);
  }, [games]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {newGames.map((game, index) => (
        <div key={index} className="border p-4">
          <img src={game.image} />
          <h3>{game.title}</h3>
          <p>{game.genre}</p>
          <p>peso del juego: {game.weight}</p>
          <p>año de lanzamiento: {game.releaseYear}</p>
        </div>
      ))}
    </div>
  );
};

export default GameList;
