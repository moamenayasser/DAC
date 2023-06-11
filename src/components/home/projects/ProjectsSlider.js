// Internal Imports
import { useState } from "react";
// External Imports
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
// Components
import ProjectsHeading from "./ProjectsHeading";
import CustomSwiper from "@/components/swiper/CustomSwiper";
import ProjectItem from "@/components/items/ProjectItem";

const ProjectsSlider = ({ data, locale }) => {
  const [loaded, setLoaded] = useState(false);

 console.log(data)

  const options = {
    loop: data?.length > 3,
    spaceBetween: 20,
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    modules: [Autoplay],
    speed: 800,
    onSwiper: () => setLoaded(true),
  };

  return (
    <CustomSwiper locale={locale} {...options}>
      <ProjectsHeading
        loaded={loaded}
        locale={locale}
        slot="container-start"
        showNav={data?.length > 3}
      />

      {data?.map((item, index) => (
        <SwiperSlide
          key={index}
          style={{ paddingTop: "0.25rem", paddingBottom: "0.25rem" }}
          slot="wrapper-start"
        >
          <ProjectItem item={item} locale={locale} />
        </SwiperSlide>
      ))}
    </CustomSwiper>
  );
};

export default ProjectsSlider;
