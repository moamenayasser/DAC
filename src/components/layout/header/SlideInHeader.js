// Components
import SlideInScroll from "./SlideInScroll";

const SlideInHeader = ({ children, ...other }) => {
  return <SlideInScroll {...other}>{children}</SlideInScroll>;
};

export default SlideInHeader;
