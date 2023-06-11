// MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// Components
import WhoWeAreInfo from "./WhoWeAreInfo";
import { Box } from "@mui/material";
import WhoWeAreVideo from "./WhoWeAreVideo";

const WhoWeAreSection = (props) => {
  const { data, locale } = props;

  return (
    <Box
      sx={{
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: "#fff",
        position:"relative",
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
      
        "@media (max-width: 768px)": {
          "&:before": {
            backgroundImage: "none",}
      }
      }}
    >
      <Container fixed>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} position="relative">
            <WhoWeAreVideo  video={data.AdvancedCategoryMedia?.find(item => item.Prima)}/>
          </Grid>

          <Grid item xs={12} md={6} position="relative">
            <WhoWeAreInfo data={data} locale={locale} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhoWeAreSection;
