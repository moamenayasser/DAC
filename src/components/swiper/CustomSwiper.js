// External Imports
import { Swiper } from "swiper/react";
// Styles
import "swiper/css";

const CustomSwiper = (props) => {
  const { locale, children, ...other } = props;

  const options = {
    slidesPerView: "auto",
    dir: locale === "ar" ? "rtl" : "ltr",
  };

  return (
    <Swiper {...options} {...other}>
      {children}
    </Swiper>
  );
};

export default CustomSwiper;
