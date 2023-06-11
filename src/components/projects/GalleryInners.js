// External Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper";
// MUI
import { Box, Container } from "@mui/material";
import Image from "next/image";
// Styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const GalleryInners = ({ projects, locale }) => {
  const options = {
    spaceBetween: 0,
    loop: true,
    effect: "fade",
    slidesPerView: "auto",
    dir: locale === "ar" ? "rtl" : "ltr",
    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      500: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      1000: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
    speed: 800,
    pagination: {
      clickable: true,
      type: "bullets",
      bulletActiveClass: "active",
      bulletClass: "dot",
      horizontalClass: "dots",
    },
    modules: [Autoplay, EffectFade, Pagination],
  };

  return (
    <Box flexGrow={1} pb={1}>
      <Swiper {...options}>
        {projects?.map((item, index) => (
          <SwiperSlide key={index} style={{ height: 400 }}>
            <Image
              src={item.ImageUrl}
              width={550}
              height={340}
              alt={item.Name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
export default GalleryInners;
