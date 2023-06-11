// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// Componetns
import ProjectsArrows from "./ProjectsArrows";

const ProjectsNavigation = ({ locale }) => {
  return (
    <>
      <ProjectsArrows type="left">
        {locale === "ar" ? (
          <ArrowForwardIcon color="#fff" />
        ) : (
          <ArrowBackIcon color="#fff" />
        )}
      </ProjectsArrows>

      <ProjectsArrows type="right">
        {locale === "ar" ? (
          <ArrowBackIcon color="#fff" />
        ) : (
          <ArrowForwardIcon color="#fff" />
        )}
      </ProjectsArrows>
    </>
  );
};

export default ProjectsNavigation;
