// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
// Internal Imports
import Image from "next/image";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Keyboard, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
const bannerData = [
  {
    id: 1,
    url: "/images/1.jpg",
    title_en: "1",
  },
  {
    id: 2,
    url: "/images/2.jpg",
    title_en: "2",
  },
];
const BoxWrapper = styled(Box)(() => ({
  position: "relative",
  paddingBottom: "50px",
  "&:before": {
    content: "''",
    position: "absolute",
    left: "0",
    backgroundImage: "url(/images/texture.webp)",
    backgroundSize: "cover",
    backgroundPosition: "top",
    width: "100%",
    height: "65vh",
    zIndex: "-1",
  },
}));
const InnerProj = () => {
  return (
    <>
      <BoxWrapper>
        <Container>
          <Grid container spacing={3} display="flex">
            <Grid item xs={12} md={12}>
              <Typography
                variant="h2"
                component="h2"
                mb={3}
                mt={5}
                color="primary"
                fontFamily="acumin_en_font"
                style={{
                  textTransform: "uppercase",
                  paddingTop: "80px",
                }}
              >
                RIC O&M Department & RC Facilities
              </Typography>
              <Swiper
                className="main-slider"
                modules={[EffectFade, Keyboard, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                effect={"fade"}
                keyboard={{
                  enabled: true,
                }}
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: false,
                }}
                loop={true}
              >
                {bannerData?.length !== 0 &&
                  bannerData?.map((el) => (
                    <SwiperSlide key={el.id}>
                      <Image
                        src={el.url}
                        alt={el.title_en}
                        width={500}
                        height={450}
                        priority
                        style={{
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="section-title">
                <h2>Project preif</h2>
              </div>
              <ul className="inner-list">
                <li>
                  <span>
                    <strong>Project Name:</strong>
                  </span>
                  Asmou Sales Center
                </li>
                <li>
                  <span>
                    <strong>Owner:</strong>
                  </span>
                  Asmou Real-Estate
                </li>
                <li>
                  <span>
                    <strong>Consultant:</strong>
                  </span>
                  Ehaf Consulting Engineers
                </li>
                <li>
                  <span>
                    <strong>Main Contractor:</strong>
                  </span>
                  Ahead – DAC Group
                </li>
                <li>
                  <span>Built up Area = 1500 m2</span>
                </li>
                <li>
                  <span>
                    <strong>Includes:</strong> high-end finishes
                    Electromechanical works, outdoor landscaping, interior
                    design & fit out
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Project Duration:</strong> 4 months / July – Oct.
                  </span>
                </li>
                <li>
                  <span>
                    2022 Asmou Sales Center Project has a Breath-taking view
                    across the dynamic Jeddah skyline.
                  </span>
                </li>
              </ul>
            </Grid>

            <Grid item xs={12}>
              <box>
                <Button
                  variant="contained"
                  color="secondary"
                  mt={8}
                  mb={5}
                  component={Link}
                  href="#"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    borderColor: "#000",
                    marginRight: "5px",
                  }}
                >
                  All Project
                </Button>
              </box>
            </Grid>
          </Grid>
        </Container>
      </BoxWrapper>
      <style jsx>{`
        .inner-list li {
          list-style-type: square;
          margin-left: 15px;
          color: #4d4d4f;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
};

export default InnerProj;
