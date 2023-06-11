import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

const ScrollToTop = (props) => {
  const { children, target, triggerOn = 0, customStyle = {} } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: triggerOn,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      target
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", zIndex: 99, ...customStyle }}
      >
        {children}
      </Box>
    </Fade>
  );
};

export default ScrollToTop;
