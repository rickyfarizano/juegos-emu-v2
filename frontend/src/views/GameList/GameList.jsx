import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../context/GameContext';
import GameCard from '../../components/GameCard/GameCard';
import './GameList.css';

const GameList = () => {
  const { games } = useGameContext();
  const [newGames, setNewGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  // Sincronizamos los juegos desde el contexto con el estado local
  useEffect(() => {
    setNewGames(games);
  }, [games]);

  // Cálculo de juegos a mostrar en la página actual
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = newGames.slice(indexOfFirstGame, indexOfLastGame);

  // Cambiar de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calcular el número total de páginas
  const totalPages = Math.ceil(newGames.length / gamesPerPage);

  // Generar las páginas visibles para mostrar
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="min-h-screen flex flex-col items-start p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {currentGames.map((game) => (
          <div key={game._id} className="transition-opacity duration-500 opacity-100">
            <GameCard game={game} />
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="pagination-container flex items-center justify-center mt-6">
        <button
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#8592; 
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <span className="pagination-dots">...</span>
        )}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <button
            className={`pagination-button`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}

        <button
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default GameList;
