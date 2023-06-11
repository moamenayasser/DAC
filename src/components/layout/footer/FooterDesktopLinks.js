// Internal Imports
import Link from "next/link";
// MUI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
// Components
import useResources from "@/hooks/useResources";

const LinksWrapperStyle = styled("ul")({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  maxHeight: 200,
  "& a": {
    fontSize: "0.8rem",
    textTransform: "capitalize",
    display: "block",
    position: "relative",
    width: "fit-content",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    "&::after": {
      content: "''",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 1,
      backgroundColor: "#fff",
      transition: "0.25s ease-in-out",
    },
    "&:hover": {
      "&::after": {
        width: "100%",
      },
    },
  },
});

const FooterDesktopLinks = (props) => {
  const { data, handleClick, index, matches, open } = props;

  return (
    <Box>
      <Typography
        onClick={() => handleClick(index)}
        component="h4"
        variant="h6"
        textTransform="capitalize"
        gutterBottom
        sx={{
          "&": {
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
          "& svg": {
            margin: "-7px",
            marginLeft: "5px",
          },
        }}
      >
        {useResources(data.title)}
        {!matches && (open === index ? <ExpandLess /> : <ExpandMore />)}
      </Typography>

      <Collapse in={matches ? open : open === index} timeout="auto">
        <LinksWrapperStyle>
          {data?.links?.map((item) => (
            <li key={item.id}>
              <Link href={item.href}>
                {item.useRes ? useResources(item.title) : item.title}
              </Link>
            </li>
          ))}
        </LinksWrapperStyle>
      </Collapse>
    </Box>
  );
};

export default FooterDesktopLinks;
