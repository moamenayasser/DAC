import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import NextImage from "@/components/NextImage";

const AboutMission = (props) => {
  const { datavision, datamission, datavalue, locale } = props;
  return (
    <Box flexGrow={1} pt={10} pb={10} pr={2} pl={2} >
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Typography
            component="h4"
            variant="h6"
            mb={3}
            textTransform="uppercase"
            sx={{
              fontSize: "16px !important",
              fontWeight: 700,
              "@media (min-width: 1200px)": {
                fontSize: "24px !important",
              },
            }}
          >
            {datamission.Title}
          </Typography>

          <Typography
            component="p"
            variant="p"
            mb={3}
            sx={{
              fontSize: "16px !important",
              "@media (min-width: 1200px)": {
                fontSize: "17px !important",
              },
            }}
          >
            {datamission.ShortDescription}
          </Typography>
          <Typography
            component="h4"
            variant="h6"
            mb={3}
            textTransform="uppercase"
            sx={{
              fontSize: "16px !important",
              fontWeight: 700,
              "@media (min-width: 1200px)": {
                fontSize: "24px !important",
              },
            }}
          >
            {datavision.Title}
          </Typography>
          <Typography
            component="p"
            variant="p"
            mb={3}
            sx={{
              fontSize: "16px !important",
              "@media (min-width: 1200px)": {
                fontSize: "17px !important",
              },
            }}
          >
            {datavision.ShortDescription}
          </Typography>

          <Typography
            component="h4"
            variant="h6"
            textTransform="uppercase"
            mb={3}
            sx={{
              fontSize: "16px !important",
              fontWeight: 700,
              "@media (min-width: 1200px)": {
                fontSize: "24px !important",
              },
            }}
          >
            {datavalue.Title}
          </Typography>
          <Typography
            component="p"
            variant="p"
            mb={3}
            sx={{
              fontSize: "16px !important",
            }}
          >
            {datavalue.ShortDescription}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <NextImage
            src={datavision.WebImageURL}
            width={500}
            height={550}
            alt={datavision.ImageAlt}
            style={{ maxWidth: "100%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutMission;
