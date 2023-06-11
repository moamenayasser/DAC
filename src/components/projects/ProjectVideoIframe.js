// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getYoutubeUrl } from "@/utils";

const ProjectVideoIframe = ({ item }) => {
  return (
    <iframe
      width="100%"
      height="300"
      src={getYoutubeUrl(item?.YoutubeLink)}
      title={item.Name}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

export default ProjectVideoIframe;
