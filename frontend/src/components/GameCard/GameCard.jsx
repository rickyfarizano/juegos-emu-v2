import React from 'react';

const GameCard = ({ game }) => {
  return (
    <div className="relative group w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
   
      {game.image && (
      <img
        src={`http://localhost:5000/${game.image}`}
        alt={game.title}

      />
      )}
     
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-xl font-bold text-center px-2">
          {game.title}
        </h3>
      </div>
    </div>
  );
};

export default GameCard;