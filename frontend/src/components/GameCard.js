import React from 'react';
import './GameCard.css';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <a href="#">
        {game.image && (
          <img
            className="game-image"
            src={`http://localhost:5000/${game.image}`}
            alt={game.title}
          />
        )}
      </a>
      <div className="game-info">
        <h5 className="game-title">{game.title}</h5>
        <p className="game-year">Año: {game.releaseYear}</p>
        <p className="game-genre">Género: {game.genre}</p>
        <a href="#" className="details-button">Ver Detalle</a>
      </div>
    </div>
  );
};

export default GameCard;
