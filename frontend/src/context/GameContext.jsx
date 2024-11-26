import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  // Cargar juegos desde MongoDB al montar el componente
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/games'); // Reemplaza con tu endpoint real
        setGames(response.data); // Actualizar el estado con los juegos obtenidos
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  // Método para agregar un juego
  const addGame = async (game) => {
    try {
      const response = await axios.post('http://localhost:5000/api/games', game); // Reemplaza con tu lógica de backend
      setGames((prevGames) => [...prevGames, response.data]); // Actualizar el estado con el nuevo juego
    } catch (error) {
      console.error('Error adding game:', error);
    }
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
