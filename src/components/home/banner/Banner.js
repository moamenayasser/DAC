import { SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper";
import { styled } from "@mui/material/styles";
import CustomSwiper from "@/components/swiper/CustomSwiper";
import BannerItem from "./BannerItem";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const SlideItemWrapper = styled(SwiperSlide)(({ theme }) => ({
  position: "relative",
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    height: "100vh",
  },
}));

const Banner = ({ locale, data }) => {
  const options = {
    loop: true,
    effect: "fade",
    speed: 2000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
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
    <CustomSwiper locale={locale} {...options}>
      {data?.map((item, index) => (
        <SlideItemWrapper key={index}>
          <BannerItem item={item} index={index} />
        </SlideItemWrapper>
      ))}
    </CustomSwiper>
  );
};

export default Banner;
