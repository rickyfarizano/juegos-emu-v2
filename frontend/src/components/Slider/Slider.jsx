import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css"; // Estilos básicos de Swiper
import "swiper/css/navigation"; // Estilos para la navegación
import "swiper/css/pagination"; // Estilos para la paginación
import "swiper/css/scrollbar"; // Estilos para el scrollbar
import "./Slider.module.css"; // Tus estilos personalizados

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0} // Espacio entre slides
      slidesPerView={1} // 1 imagen por vez
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log("Slide changed")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img className="move-left" src="/images/dragon-ball-banner.jpg" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="slide-image" src="/images/fc25-banner.jpg" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="slide-image" src="/images/howarts-banner.jpg" alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="slide-image" src="/images/thelastofus-banner.jpg" alt="Slide 4" />
      </SwiperSlide>
      
    </Swiper>
  );
};

export default Slider;
