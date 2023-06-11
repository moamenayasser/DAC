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
import NextImage from "./NextImage";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
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

const DivStruc = () => {
  return (
    <>
      <Box pt={4} pb={10}>
        <Container>
          <Grid container spacing={3} display="flex">
            <Grid item xs={12} md={6}>
              <NextImage
                src="/images/cbs.jpg"
                alt="divs"
                width={150}
                height={80}
                placeholder="blur"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div className="section-title">
                <Typography
                  variant="h2"
                  component="h2"
                  marginBottom="20px"
                  color="primary"
                >
                  Building A Concrete Future
                </Typography>
              </div>
              <ul className="inner-list">
                <li>
                  <span>Project Management</span>
                </li>
                <li>
                  <span>Scope Management</span>
                </li>

                <li>
                  <span>Time Management</span>
                </li>
                <li>
                  <span>Cost Management</span>
                </li>
                <li>
                  <span>Quality Management</span>
                </li>
                <li>
                  <span>Human Resource Management</span>
                </li>
              </ul>
              <div>
                <Link
                  style={{
                    textDecoration: "underline",
                    padding: "10px 0",
                    display: "block",
                    transition: "0.3s",
                    marginBottom: "20px",
                  }}
                  href="#"
                  target="_blank"
                >
                  <FileDownloadIcon
                    sx={{ width: "20px", marginBottom: "-7px" }}
                  />
                  Download brochure
                </Link>
              </div>
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
                  View Project
                </Button>
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
                  }}
                >
                  View Website
                </Button>
              </box>
            </Grid>

            <Grid item xs={12} md={6}>
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
          </Grid>
        </Container>
      </Box>
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

export default DivStruc;
