import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/games');
        console.log('Games data:', response.data);
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      
      {games.length === 0 ? (
        <p>No hay juegos disponibles.</p>
      ) : (
        games.map((game) => (
          <div key={game._id}>
            <h3>{game.title}</h3>
            <p>Género: {game.genre}</p>
            <p>Año de Lanzamiento: {game.releaseYear}</p>
            <p>Rating: {game.rating}</p>
            <p>Descripción: {game.description}</p>
            {game.image && <img src={`http://localhost:5000/${game.image}`} alt={game.title} style={{ width: '200px', height: 'auto' }} />}
          </div>
        ))
      )}
    </div>
  );
};

export default GameList;
