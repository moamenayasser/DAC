import Link from "next/link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Paralex = ({ data }) => {
  return (
    <div className="wrapper">
      <Container style={{ position: "relative", zIndex: 2 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 4 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          data-aos="fade-up"
        >
          <Grid item xs={12} md={7} position="relative">
            <div className="section-title">
              <Typography
                variant="h2"
                component="h2"
                letterSpacing="-1px"
                marginBottom="10px"
                marginTop="10px"
                textTransform="capitalize"
              >
                {data?.Title?.toLowerCase()}
              </Typography>
            </div>

            <Typography variant="body1" component="p" pb={6}>
              {data?.ShortDescription}
            </Typography>

            {data?.Link1Name && (
              <Button
                variant="contained"
                color="primary"
                mt={3}
                component={Link}
                href="/certificates"
              >
                {data?.Link1Name}
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>

      <style jsx>{`
        .wrapper {
          background-image: url(${data?.WebImageURL});
          background-repeat: no-repeat;
          background-size: cover;
          background-attachment: fixed;
          min-height: 300px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
        }
        .wrapper::after {
          content: "";
          position: absolute;
          background-color: #00000073;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default Paralex;
