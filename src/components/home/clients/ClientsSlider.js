// External Imports
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
// Components
import CustomSwiper from "../../swiper/CustomSwiper";
import NextImage from "../../NextImage";
import { Box, Container } from "@mui/material";

const ClientsSlider = ({ data, locale }) => {
  const options = {
    spaceBetween: 0,
    loop: data?.length > 3,
    breakpoints: {
      300: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      500: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1000: {
        slidesPerView: 6,
        spaceBetween: 30,
      },
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    modules: [Autoplay],
    speed: 800,
  };

  return (
    <Box>
      <Container>
        <CustomSwiper locale={locale} style={{ width: "100%" }} {...options}>
          {data?.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 15,
                }}
              >
                <NextImage
                  src={img.ImageUrl}
                  alt={img.Name}
                  width={160}
                  height={80}
                  style={{
                    width: "auto",
                    height: 60,
                    objectFit: "contain",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </Container>
    </Box>
  );
};

export default ClientsSlider;
