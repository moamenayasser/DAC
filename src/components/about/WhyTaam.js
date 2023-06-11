import { Box, Container, Grid, Typography } from "@mui/material";
import NextImage from "@/components/NextImage";
import { splitSentence } from "@/utils";


const WhyTaam = ({ data, locale }) => {
  const [first, rest] = splitSentence(data?.Title);

  return (
    <>
      <Box flexGrow={1} pt={10} pb={10} overflow="hidden">
        <Container fixed>
          <Grid
            container
            spacing={{ xs: 0, md: 4 }}
            display="flex"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              position="relative"
              data-aos="fade-right"
            >
              <div className="section-title">
                <Typography variant="h2" component="h2" marginBottom="20px">
                  {first}
                  <span style={{ color: "#a91a2d", fontWeight: 700 }}>
                    {" "}
                    {rest.toUpperCase()}{" "}
                  </span>
                </Typography>
              </div>

              <div
                locale={locale}
                dangerouslySetInnerHTML={{ __html: data?.LongDescription }}
                style={{ marginBottom: 48 }}
              />
            </Grid>
            <Grid item xs={12} md={6} position="relative" data-aos="fade-left">
              <NextImage
                src={data?.WebImageURL}
                alt={data?.ImageAlt}
                width={460}
                height={600}
                placeholder="blur"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default WhyTaam;