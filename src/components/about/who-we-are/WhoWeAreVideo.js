// MUI
import { styled } from "@mui/material/styles";
// Components
import NextImage from "@/components/NextImage";

const ImageWrapper = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  height: 400,
  
  [theme.breakpoints.up("md")]: {
    height: 420,
  },
  "& img": {
    transition: "all 0.2s linear",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const WhoWeAreVideo = ({ video }) => {
  return (
    <ImageWrapper className="img-container">
      <video
        width="100%"
        height="100%"
        playsInline
        loop
        autoPlay
        muted
        style={{objectFit:"cover"}}
        poster={video.ActualImage}
      >
        <source src={video.Video} type="video/mp4" />
      
      </video>
    </ImageWrapper>
  );
};

export default WhoWeAreVideo;
