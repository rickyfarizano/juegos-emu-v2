// src/views/GameList/GameList.jsx

import React from 'react';
import { useGameContext } from '../../context/GameContext'; // Importar el hook para acceder al contexto

const GameList = () => {
  const { games } = useGameContext(); // Acceder al estado de los juegos desde el contexto

  return (
    <div className="grid grid-cols-4 gap-4">
      {games.map((game, index) => (
        <div key={index} className="border p-4">
          <h3>{game.title}</h3>
          {/* Aquí puedes agregar más detalles como el género, año, imagen, etc. */}
        </div>
      ))}
    </div>
  );
};

export default GameList;
