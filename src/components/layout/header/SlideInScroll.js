// Internal Imports
import { cloneElement } from "react";
// MUI
import { styled } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

const AnimateSlideStyled = styled(Slide)((props) => ({
  visibility: !props.in && "visible !important",
  transform: !props.in && "none !important",
}));

const SlideInScroll = (props) => {
  const { triggerAfter = 0, cloneProps, children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: triggerAfter,
  });

  return (
    <AnimateSlideStyled appear={false} direction="down" in={trigger}>
      {cloneElement(children, {
        ...cloneProps(trigger),
        trigger,
      })}
    </AnimateSlideStyled>
  );
};

export default SlideInScroll;
