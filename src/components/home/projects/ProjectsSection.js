// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// Components
import ProjectsSlider from "./ProjectsSlider";
import ViewAllBtn from "@/components/viewAllBtn";
import useResources from "@/hooks/useResources";

const ProjectsSection = ({ data, locale }) => {
  return (
    <Box
      pt={{ md: 5, xs: 2 }}
      pb={10}
      className="box-grey"
      style={{ backgroundColor: "#fff" }}
    >
      <Container fixed>
        <ProjectsSlider data={data} locale={locale} />
      </Container>

      <div style={{ display: "flex", marginTop: 40, textAlign: "center" }}>
        <ViewAllBtn
          name={useResources("viewAllProjects")}
          variant="standard"
          link="/projects"
        />
      </div>
    </Box>
  );
};

export default ProjectsSection;
