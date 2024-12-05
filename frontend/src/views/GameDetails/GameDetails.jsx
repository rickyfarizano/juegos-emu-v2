import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useGameContext } from '../../context/GameContext';

const GameDetails = () => {
  const { id } = useParams();
  const { games } = useGameContext();
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {

    const selectedGame = games.find(game => game._id === id);
    
    if (selectedGame) {
      setGameDetails(selectedGame);
      console.log(selectedGame);
    }
  }, [id, games]);

  if (!gameDetails) {
    return <p>Juego no encontrado.</p>;
  }
  
  return (
    <section className="game-details">
      <div className="container">

          <div className="game-details__title-img">
            <h1 className="game-details__title text-3xl font-semibold mb-4 text-center text-white ">{gameDetails.title}</h1>

            <figure className="game-details__img-banner w-100 p-4 flex justify-center items-center">
            {gameDetails.image && (
              <img
                src={`http://localhost:5000/${gameDetails.image}`}
                alt={gameDetails.title}

              />
            )}
            </figure>
          </div>
        <div className="game-detals__content border m-4">


          <article className="game-details__description p-4">
            <h2 className="title text-2xl font-semibold mb-4 text-white">Descripicon del juego</h2>

            <p className="details-description text-white">
            {gameDetails.description}
            </p>
          </article>

          <article className="game-details__screenshots p-4">
            <h2 className="title text-2xl font-semibold mb-4 text-white">Video del juego</h2>
            
            <a href={gameDetails.youtubeUrl} className='p-2 rounded bg-red-700 hover:bg-red-800 text-white' target='_blank'>Ver video del juego en Youtube</a>
          </article>

          <article className="game-requirements p-4">
            <h2 className="title text-2xl font-semibold mb-4 text-white">Requerimientos del sistema</h2>
            <div className="list-container">
              <ul className="req-list">
                <li className="text-white">GPU: {gameDetails.requirements.gpu}</li>
                <li className="text-white">RAM:{gameDetails.requirements.ram}</li>
                <li className="text-white">CPU: {gameDetails.requirements.cpu}</li>
              </ul>
            </div>
          </article>

          <div className="btn w-100 flex justify-center items-center p-4">
            <a href={gameDetails.downloadLink} className="btn-download text-center p-3 rounded bg-blue-900 hover:bg-blue-800 text-white transition-all" target='_blank'>Descargar juego</a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default GameDetails