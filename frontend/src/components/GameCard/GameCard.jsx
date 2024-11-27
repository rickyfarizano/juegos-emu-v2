import React from 'react';
import { Link } from 'react-router-dom'

const GameCard = ({ game }) => {
  return (
    <>
    <Link to={`/gameList/gameDetails/${game._id}`}>
      <div className="relative group w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
        {game.image && (
        <img className='w-100'
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
    </Link>
    </>
    
  );
};

export default GameCard;