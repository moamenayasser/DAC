// Internal Imports
import { useState } from "react";
// MUI
import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import DwnloadForm from "./dwnloadForm";
// Icons
import CloseIcon from "@mui/icons-material/Close";

const StyledIcon = styled(CloseIcon)({
  zIndex: 9,
  color: "#fff",
  fill: "#fff",
  position: "absolute",
  right: "25px",
  top: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.3s ease-in-out",
});

const DownloadProfileSec = ({ data, popData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                marginBottom="10px"
                marginTop="10px"
                textTransform="capitalize"
              >
                {data?.Title}
              </Typography>
            </div>

            <Typography variant="body1" component="p" pb={4} fontSize="20px">
              {data?.ShortDescription}
            </Typography>

            {data?.Link1Name && (
              <Button variant="contained" mt={8} onClick={handleOpen}>
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
          sx={{ zIndex: "995" }}
        >
          <Box
            className="modal-box"
            height={{ xs: "100%", sm: "100vh" }}
            width={{ xs: "100%", sm: "70%", md: "40%" }}
            overflow="hidden"
            bgcolor="transparent"
            border="unset"
            margin="auto"
          >
            <StyledIcon onClick={handleClose} />
            <DwnloadForm data={popData} handleClose={handleClose} />
          </Box>
        </Modal>
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
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default DownloadProfileSec;
