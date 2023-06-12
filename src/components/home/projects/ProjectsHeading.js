// MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// Components
import ProjectsNavigation from "./ProjectsNavigation";
import useResources from "@/hooks/useResources";

const ProjectsHeading = (props) => {
  const { loaded, locale, showNav } = props;

  return (
    <Grid container spacing={3} mb={{ md: 5, xs: 2 }} alignItems="center">
      <Grid item xs={12} md={11} position="relative" data-aos="fade-up">
        <div className="section-title">
          <Typography
            variant="h2"
            component="h2"
            mb={3}
            mt={5}
            color="primary"
            style={{
              textTransform: "uppercase",
              display: "flex",
              justifyContent: locale === "en" ? "flex-start" : "flex-end",
              gap: "1rem",
              flexDirection: locale === "en" ? "row" : "row-reverse",
            }}
          >
         
            {useResources("projects")}
          </Typography>
          <Typography variant="body1" component="p">
            {useResources("homeProjectsDesc")}
          </Typography>
        </div>
      </Grid>

      {showNav && (
        <Grid
          item
          xs={12}
          md={5}
          position="relative"
          display="flex"
          justifyContent="flex-end"
          gap={1}
        >
          {loaded && <ProjectsNavigation locale={locale} />}
        </Grid>
      )}
    </Grid>
  );
};

export default ProjectsHeading;
