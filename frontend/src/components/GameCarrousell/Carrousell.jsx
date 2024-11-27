import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import styles from './Carrousell.module.css'; // Importar el módulo CSS
import { Grid, Pagination } from 'swiper/modules';
import axios from 'axios'; // Asegúrate de importar axios para obtener los juegos
import GameCard from '../GameCard/GameCard'; // Importar el componente GameCard

const Carrousell = ({ genre }) => {
  const [games, setGames] = useState([]);

  // Cargar juegos por género
  useEffect(() => {
    const fetchGamesByGenre = async () => {
      try {
        // Reemplaza la URL con el endpoint adecuado para obtener los juegos filtrados por género
        const response = await axios.get(`http://localhost:5000/api/games/genre/${genre}`);
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGamesByGenre();
  }, [genre]); // Refrescar cuando cambie el género

  return (
    <div className={styles.carouselContainer}>
      {games.length > 0 ? (
        <Swiper
          slidesPerView={3}
          grid={{
            rows: 2, // Dos filas de juegos por cada set de slides
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
          className={styles.mySwiper}
        >
          {/* Mapear los juegos y crear un SwiperSlide por cada uno */}
          {games.map((game) => (
            <SwiperSlide key={game.id}>
              <GameCard game={game} /> {/* Pasar el objeto juego como prop */}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No games available in this genre.</p>
      )}
    </div>
  );
};

export default Carrousell;