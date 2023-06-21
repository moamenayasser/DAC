// MUI
import Grid from "@mui/material/Grid";
// Images
import texture from "/public/images/texture.webp";
import ContactForm from "@/components/contact/ContactForm";
import { Container, Typography } from "@mui/material";
import useResources from "@/hooks/useResources";
import NextImage from "@/components/NextImage";

const ContactSection = ({ data, projectConfig }) => {
  return (
    <div className="wrapper">
      <Grid container sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          item
          xs={12}
          md={6}
          overflow="hidden"
          position="relative"
          display="flex"
        >
          <NextImage
            src={data?.WebImageURL}
            alt={data?.ImageAlt}
            // width={900}
            // height={900}
            fill
            placeholder="blur"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          margin="auto"
          sx={{ p: { md: "10px", xs: "10px" } }}
        >
          <div
            style={{
              paddingTop: 30,
              paddingBottom: 30,
            }}
          >
            <Container fixed>
              <div className="section-title">
                <Typography
                  variant="h2"
                  component="h3"
                  marginBottom="20px"
                  color="#fff"
                  textTransform="uppercase"
                  
                >
                  {useResources("contactus")} 
                </Typography>
              </div>

              <ContactForm projectConfig={projectConfig}/>
            </Container>
          </div>
        </Grid>
      </Grid>

      <style jsx>{`
        .wrapper {
          background-image: url(${texture.src});
          position: relative;
        }
        .wrapper::after {
          content: "";
          position: absolute;
          background-color: #727071bd;
          width: 100%;
          height: 100%;
          opacity: 0.9;
          display: block;
          top: 0;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default ContactSection;
