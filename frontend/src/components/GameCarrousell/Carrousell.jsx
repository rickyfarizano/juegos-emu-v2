import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import styles from './Carrousell.module.css';
import { Grid, Pagination } from 'swiper/modules';
import { useGameContext } from '../../context/GameContext'; // Importa el contexto
import GameCard from '../GameCard/GameCard';

const Carrousell = ({ genre }) => {
  const { games } = useGameContext(); // Obtén todos los juegos del contexto
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    // Filtrar los juegos por género
    const gamesByGenre = games.filter((game) => game.genre.toLowerCase() === genre.toLowerCase());
    setFilteredGames(gamesByGenre);
  }, [genre, games]);

  return (
    <div className={styles.carouselContainer}>
      {filteredGames.length > 0 ? (
        <Swiper
          slidesPerView={3}
          grid={{ rows: 2 }}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Grid, Pagination]}
          className={styles.mySwiper}
        >
          {filteredGames.map((game) => (
            <SwiperSlide key={game._id}>
              <GameCard game={game} />
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
