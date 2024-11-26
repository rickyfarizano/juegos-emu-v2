import React from 'react';
import Slider from '../../components/Slider/Slider'; // Asegúrate de que el path sea correcto
import './Home.css';

const Home = () => {
  return (
    <section className="home-container">
      <div className="container">

        <section className="carousel-banner">
          <Slider />
        </section>

        {/* aca van a ir los distintos grupos de juegos separados por genero */}
        <section className="game-groups m-4 flex gap-4 flex-col">

          {/* reemplazar desde ACA ============ */}
          <div className="game bg-neutral-700 p-4">
            <h2 className="group-title text-white text-4xl mb-2">Accion</h2>

            <div className="container-groups">
              <p className='text-white'>aca iria el carousel con los juegos correspondientes a su genero</p>
            </div>
          </div>
          {/* hasta ACA ============ */}

          <div className="game bg-neutral-700 p-4">
            <h2 className="group-title text-white text-4xl mb-2">Aventura</h2>

            <div className="container-groups">
              <p className='text-white'>aca iria el carousel con los juegos correspondientes a su genero</p>
            </div>
          </div>

          <div className="game bg-neutral-700 p-4">
            <h2 className="group-title text-white text-4xl mb-2">RPG</h2>

            <div className="container-groups">
              <p className='text-white'>aca iria el carousel con los juegos correspondientes a su genero</p>
            </div>
          </div>

        </section>

      </div>
    </section>
  );
};

export default Home;
