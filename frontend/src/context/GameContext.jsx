// src/context/GameContext.jsx
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  // Método para agregar un juego
  const addGame = (game) => {
    setGames((prevGames) => [...prevGames, game]);
  };

  return (
    <GameContext.Provider value={{ games, addGame }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook para acceder al contexto
export const useGameContext = () => {
  return useContext(GameContext);
};
