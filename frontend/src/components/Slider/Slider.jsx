import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, EffectFade, Scrollbar, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import "./Slider.module.css";

const Slider = () => {
  return (
    <Swiper
      modules={[Pagination, A11y, EffectFade, Scrollbar, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      effect="fade"
      pagination={false}
      navigation={false}
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