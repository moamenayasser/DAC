// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// Componetns
import useResources from "@/hooks/useResources";

const ClientsHeading = () => {
  return (
    <Container>
      <Grid container spacing={3} mb={1}>
        <Grid
          item
          xs={12}
          position="relative"
          textAlign={{ md: "left", xs: "left" }}
          mb={5}
           data-aos="fade-up"
        >
          <div className="section-title">
            <Typography variant="h2" component="h2" marginBottom="20px">
                {useResources("key")}{" "}
              {useResources("clients")}
            </Typography>
           
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientsHeading;
