// MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// Components
import { splitSentence } from "@/utils";
import NextImage from "@/components/NextImage";
import { Box, Typography } from "@mui/material";

const HoldingCompany = ({ data, locale }) => {
  const [first, rest] = splitSentence(data?.Title);
console.log(data)
  return (
    <>
      <Box
        sx={{
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: "#f8f8f8",
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
          "@media (max-width: 768px)": {
            "&:before": {
              backgroundImage: "none",}
        }
        }}
      >
        <Container fixed>
          <Grid container spacing={4} alignItems="center" data-aos="fade-up">
            <Grid item xs={12} md={7} position="relative">
              <NextImage
                src={data?.WebImageURL}
                alt={data?.ImageAlt}
                width={600}
                height={600}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Grid>

            <Grid item xs={12} md={5} position="relative">
              <Typography
                variant="h2"
                component="h2"
                marginBottom="20px"
                textTransform="uppercase"
              >
                {first}
              </Typography>
              <Typography variant="h2" component="h2" marginBottom="20px">
                {rest}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: data.LongDescription }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HoldingCompany;
