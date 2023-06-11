// Internal Imports
import Link from "next/link";
// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Components
import NextImage from "@/components/NextImage";

const BannerItem = ({ item, index }) => {
  return (
    <>

      {item.BannerType === 1 && (
        <NextImage
          className="banner-bg"
          src={item.Image}
          alt={item.Alt}
          fill
          style={{
            objectPosition: "50% 50%",
          }}
          priority={index === 0 || index === 1}
        />
      )}
      {item.BannerType === 2 && (
        <video width="100%" height="100%" playsInline loop autoPlay muted
          style={{
            objectFit: "cover", position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            width: "100%",
            height: "100%"
          }} className="banner-bg">
          <source src={item.Video} type="video/mp4" />

        </video>
      )}

      <Container>
        <Grid container justifyContent="flex-start" textAlign="left" pt={10}>
          <Grid
            item
            md={8}
            xs={12}
            justifyContent="flex-start"
            position="relative"
            zIndex="9"
            color="#fff"
            sx={{
              width: "75%",
              padding: "20px",
              position: "relative",
              background: "#00000085",
              display: "block",
            }}
          >
            <>
              {item.Title && (
                <Typography
                  variant="h1"
                  component="h1"
                  position="relative"
                  zIndex="9"
                  mb={1}
                >
                  {item.Alt}
                </Typography>
              )}
              {item.Title && (
                <Typography
                  variant="h1"
                  component="h1"
                  position="relative"
                  zIndex="9"
                  mb={1}
                >
                  {item.Title}
                </Typography>
              )}

              {item.Body && (
                <Typography component="p" fontSize="calc(1rem + 0.15vw)" mb={2}>
                  {item.Body}
                </Typography>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 15,
                  marginTop: 10,
                }}
              >
                {item.Button1Enabled && (
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    href={item.Button1URL}
                    sx={{ minWidth: { xs: 150, sm: 180 } }}
                  >
                    {item.Button1Name}
                  </Button>
                )}
                {item.Button2Enabled && (
                  <Button
                    variant="secondOutlined"
                    color="primary"
                    component={Link}
                    href={item.Button2URL}
                    sx={{ minWidth: { xs: 150, sm: 180 } }}
                  >
                    {item.Button2Name}
                  </Button>
                )}
              </div>
            </>
          </Grid>
        </Grid>
      </Container>
      <div className="banner-overlay"></div>
    </>
  );
};

export default BannerItem;
