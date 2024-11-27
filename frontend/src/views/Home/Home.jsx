import React from 'react';
import Slider from '../../components/Slider/Slider'; // Asegúrate de que el path sea correcto
import './Home.css';
import Carousel from '../../components/GameCarrousell/Carrousell.jsx'; // Asegúrate de que el path sea correcto

const Home = () => {
  return (
    <section className="home-container">
      <div className="main-content">
        <section className="carousel-banner">
          <Slider />
        </section>

        {/* aca van a ir los distintos grupos de juegos separados por genero */}
        <section className="game-groups">

          {/* Grupo de juegos Acción */}
          <div className="game">
            <h2 className="group-title">Acción</h2>
            <div className="container-groups">
              {/* Aquí va el Carousel para el género Acción */}
              <Carousel genre="Acción" />
            </div>
          </div>

          {/* Grupo de juegos Aventura */}
          <div className="game">
            <h2 className="group-title">Aventura</h2>
            <div className="container-groups">
              {/* Aquí va el Carousel para el género Aventura */}
              <Carousel genre="Aventura" />
            </div>
          </div>

          {/* Grupo de juegos RPG */}
          <div className="game">
            <h2 className="group-title">RPG</h2>
            <div className="container-groups">
              {/* Aquí va el Carousel para el género RPG */}
              <Carousel genre="RPG" />
            </div>
          </div>

        </section>
      </div>
    </section>
  );
};

export default Home;