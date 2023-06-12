import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useResources from "@/hooks/useResources";

const DynamicApplyForm = dynamic(() => import("./ApplyForm"), {
  ssr: false,
  loading: () => "Loading...",
});

const ApplySection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsLoading(false), []);

  return (
    <Box pt={7} pb={7} bgcolor="#f8f8f8" className="multi" position="relative">
      <Container fixed sx={{ maxWidth: { md: "74%" } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} position="relative">
            <div className="section-title">
              <Typography
                variant="h4"
                component="h3"
                marginBottom="20px"
                color="primary"
                textTransform="capitalize"
              >
                {useResources("applyNow")}
              </Typography>
            </div>
          </Grid>
        </Grid>

        {!isLoading && <DynamicApplyForm />}
      </Container>
    </Box>
  );
};

export default ApplySection;
