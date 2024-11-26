import React from 'react';
import Slider from '../../components/Slider/Slider'; // Asegúrate de que el path sea correcto
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Banner lateral izquierdo */}
      <div className="left-banner">
        <img src="/images/god-of-war-izquierda.jpg" alt="Left Banner" />
      </div>

      {/* Contenido principal (Slider en el centro) */}
      <div className="main-content">
        <Slider />
      </div>

      {/* Banner lateral derecho */}
      <div className="right-banner">
        <img src="/images/the-witcher-derecha.jpg" alt="Right Banner" />
      </div>
    </div>
  );
};

export default Home;
