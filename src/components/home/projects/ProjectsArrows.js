// External Imports
import { useSwiper } from "swiper/react";
// MUI
import Button from "@mui/material/Button";
// Componetns
import useResources from "@/hooks/useResources";

const ProjectsArrows = (props) => {
  const { type, children, ...other } = props;

  const swiper = useSwiper();

  const handleNextClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    swiper.slideNext();
  };
  const handlePrevClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    swiper.slidePrev();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      aria-label={type === "left" ? useResources("prev") : useResources("next")}
      onClick={type === "left" ? handlePrevClick : handleNextClick}
      className="arrow"
      {...other}
    >
      {children}
    </Button>
  );
};

export default ProjectsArrows;
