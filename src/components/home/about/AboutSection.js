// MUI
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Components
import ImageSection from "./ImageSection";
import InfoSection from "./InfoSection";

const AboutBox = styled("div")(({ theme }) => ({
  position: "relative",
  flexGrow: 1,
  paddingTop: theme.spacing(7),
  paddingBottom: theme.spacing(10),
  paddingTop: 8,
  paddingBottom: "80px",
  position: "relative",
  "&:before": {
    content: '""',
    backgroundImage: 'url("/images/texture.webp")',
    width: "35%",
    height: "100%",
    top: "0",
    position: "absolute",
    left: "0",
    display: "block",
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    padding: "20px !important",
    "&:before": {
      backgroundImage: "none",
    },
  },
  "& .MuiGrid-container": {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
    },
  },
  "& img": {
    position: "relative",
    transition: "all 0.2s linear",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const AboutSection = ({ data }) => {
  return (
    <AboutBox>
      <Container fixed>
        <Grid
          container
          spacing={{ xs: 0, md: 4 }}
          display="flex"
          alignItems="center"
        >
          <Grid
            item
            sm={12}
            md={6}
            position="relative"
            width="100%"
            className="img-border"
          >
            <ImageSection data={data} />
          </Grid>

          <Grid item sm={12} md={6} position="relative">
            <InfoSection data={data} />
          </Grid>
        </Grid>
      </Container>
    </AboutBox>
  );
};

export default AboutSection;
