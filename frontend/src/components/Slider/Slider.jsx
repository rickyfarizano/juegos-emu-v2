import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, EffectFade, Scrollbar, Autoplay } from "swiper/modules"; // Importamos Autoplay

import "swiper/css"; // Estilos básicos de Swiper
import "swiper/css/pagination"; // Estilos para la paginación (ya no se usará)
import "swiper/css/effect-fade"; // Estilos para el efecto de fundido
import "swiper/css/scrollbar"; // Estilos para el scrollbar
import "./Slider.module.css"; // Tus estilos personalizados

const Slider = () => {
  return (
    <Swiper
      modules={[Pagination, A11y, EffectFade, Scrollbar, Autoplay]} // Añadimos Autoplay aquí
      spaceBetween={0} // Espacio entre slides
      slidesPerView={1} // 1 imagen por vez
      loop={true} // Habilitamos el loop
      autoplay={{
        delay: 5000, // Autoplay cada 5 segundos
        disableOnInteraction: false, // Mantiene el autoplay incluso cuando el usuario interactúa
      }}
      effect="fade" // Aplicamos el efecto de fade
      pagination={false} // Desactivamos la paginación (pelotitas)
      navigation={false} // Desactivamos las flechas de navegación
      scrollbar={{ draggable: true }} // Habilitamos el scrollbar
      onSlideChange={() => console.log("Slide changed")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {/* Primer slide agregado */}
      <SwiperSlide>
        <img className="move-left" src="/images/dragon-ball-banner.jpg" alt="Slide 1" />
      </SwiperSlide>
      {/* Otros slides */}
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