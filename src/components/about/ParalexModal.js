// Internal Imports
import { useState } from "react";
import Image from "next/image";
// MUI
import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import { splitSentence } from "@/utils";
// Icons
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import NextImage from "@/components/NextImage";

const StyledIcon = styled(CloseIcon)({
  zIndex: 9,
  backgroundColor: "#000",
  width: "35px",
  height: "35px",
  color: "#fff",
  fill: "#fff",
  border: "1px solid #000",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#000",
    fill: "#000",
  },
});
const ZoomImage = styled("div")({
  "& .react-transform-wrapper": {
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  "& .react-transform-component": {
    width: "100%",
    height: "100%",
  },
  "& img": {
    position: "relative !important",
  },
  "@media (max-width: 768px)": {
    "& img": {
      height: "100% !important",
    },
  },

  "& .tools": {
    position: "absolute",
    top: "0px",
    zIndex: 9,
    display: "flex",
    margin: "0px",
    gap: 10,
    "& button": {
      zIndex: 9,
      backgroundColor: "#000",
      width: "40px",
      height: "40px",
      color: "#fff",
      fill: "#fff",
      border: "1px solid #000",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& svg": {
        position: "relative",
        right: 0,
        top: 0,
      },
    },
  },
});

const ParalexModal = ({ data, chartData }) => {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
console.log(chartData);
  return (
    <div className="wrapper">
      <Container style={{ position: "relative", zIndex: 2 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 4 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={10} position="relative">
            <div className="section-title">
              <Typography
                variant="h2"
                component="h2"
                letterSpacing="-1px"
                marginBottom="20px"
                marginTop="10px"
                textTransform="capitalize"
              >
                {data?.Title}
              </Typography>
            </div>

            <Typography variant="body1" component="p" pb={2}>
              {data?.ShortDescription}
            </Typography>

            {data?.Link1Name && (
              <Button
                variant="outlined"
                color="primary"
                mt={2}
                onClick={handleOpen}
              >
                {data?.Link1Name}
              </Button>
            )}
          </Grid>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{}}
        >
          <Box
            className="modal-box"
            height={{ xs: 400, sm: "90vh" }}
            width="90%"
            overflow="hidden"
            bgcolor="transparent"
            border="unset"
          >
            <StyledIcon onClick={handleClose} />
            {chartData?.WebImageURL && (
              <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
              >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <ZoomImage>
                    <div className="tools">
                      <button onClick={() => zoomIn()}>
                        <ZoomInIcon fontSize="large" />
                      </button>
                      <button onClick={() => zoomOut()}>
                        <ZoomOutIcon fontSize="large" />
                      </button>
                    </div>
                    <TransformComponent>
                      <NextImage
                        src={chartData?.WebImageURL}
                        alt="Organization Chart"
                        width={700}
                        height={1000}
                        style={{
                          width: "100%",
                          height: "100vh",
                          objectFit: "contain",
                        }}
                      />
                      <div>Example text</div>
                    </TransformComponent>
                  </ZoomImage>
                )}
              </TransformWrapper>
            )}
          </Box>
        </Modal>
      </Container>

      <style jsx>{`
        .wrapper {
          background: #000;
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

export default ParalexModal;
