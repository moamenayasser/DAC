// Intenral Imports
import Link from "next/link";
// MUI
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// Components
import NextImage from "@/components/NextImage";
import LinkIcon from "@mui/icons-material/Link";
const CardBox = styled(Card)(({ theme }) => ({
  borderRadius: 0,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  border: "none",
  boxShadow: "none",
  position: "relative",
  "& .overlay-link": {
    opacity: "0",
    position: "absolute",
    top: "0",
    zIndex: "3",
    transition: "0.4s ease-in-out",
    width: "100%",
    height:"80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "&:hover .overlay-link": {
    opacity: "1",
  },
  "& .link-div": {
    background:"#000",
    width: "70px",
    height: "70px",
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    float: "left",
    zIndex: "99",
    cursor: "pointer",
    borderRadius: "50%",
    "& svg": {
      color: "#fff",
    },
  },
  "& .card-img img": {
    minWidth: "100%",
    maxWidth: "100%",
    transition: "all 0.3s ease-out 0s",
    objectFit: "cover"
  },
  "&:hover": {
    "& .card-img img": {
      transform: "scale(1.1)",
    },
    "& .card-title": {
      color: theme.palette.secondary.main,
    },
  },
}));

const ProjectItem = ({ item }) => {
  return (
    <CardBox>
      <Link href={`/projects/${item?.UniqueName}`}>
        <CardMedia sx={{ overflow: "hidden" }} className="card-img">
          <NextImage
            src={item?.ImageUrl}
            width={400}
            height={240}
            alt={item.Name}
            placeholder="blur"
          />
        </CardMedia>
      </Link>
      <Link className="overlay-link" href={`/projects/${item?.UniqueName}`}>
        <div className="link-div">
          <LinkIcon />
        </div>
      </Link>

      <div
        style={{
          position: "relative",
          textAlign: "center",
          paddingTop: 10,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link href={`/projects/${item?.UniqueName}`}>
          <Typography
            variant="h4"
            component="h2"
            mb={2}
            className="card-title"
            truncate={1}
            textTransform="capitalize"
            textAlign="left"
          >
            {item?.Name?.toLowerCase()}
          </Typography>
        </Link>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {item?.Link1 && (
            <Link href={`/projects/${item?.UniqueName}`} className="view-link">
              {item?.Link1}
            </Link>
          )}
        </div>
      </div>
    </CardBox>
  );
};

export default ProjectItem;
