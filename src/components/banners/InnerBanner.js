import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BannerBreadcrumb from "./bannerBreadcrumb";
import NextImage from "../NextImage";

const BannerStyle = styled("div")(({ theme }) => ({
  height: "300px",
  [theme.breakpoints.up("md")]: {
    height: "400px",
  },
  display: "flex",
  alignItems: "center",
  position: "relative",
  zIndex: "100",
  "&:before": {
    content: '""',
    position: "absolute",
    background: "#000",
    width: "100%",
    height: "100%",
    opacity: "0.5",
    display: "block",
    top: 0,
    zIndex: 1,
  },
  "& .banner-details": {
    zIndex: 1,
    position: "relative",
    color: "#fff",
  },
}));

const InnerBanner = (props) => {
  const { crumbs = [], title, imgSrc } = props;

  return (
    <BannerStyle>
      <NextImage src={imgSrc} alt={title} fill priority />

      <Container className="banner-details">
        <Typography
          variant="h1"
          component="h1"
          mt={10}
          style={{ textTransform: "capitalize",textAlign:"center" }}
          truncate={2}
        >
          {title.toLowerCase()}
        </Typography>

        {crumbs?.length !== 0 && <BannerBreadcrumb crumbs={crumbs} />}
      </Container>
    </BannerStyle>
  );
};

export default InnerBanner;
