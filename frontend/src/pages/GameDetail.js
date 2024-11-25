// src/pages/GameDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/games/${id}`);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{game.title}</h1>
      <p>Género: {game.genre}</p>
      <p>Año de lanzamiento: {game.releaseYear}</p>
      <p>Calificación: {game.rating}</p>
      <p>Descripción: {game.description}</p>
      <p>Desarrollador: {game.developer.name}</p>
    </div>
  );
};

export default GameDetail;
