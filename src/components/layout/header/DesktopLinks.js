// MUI
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// Components
import NextActiveLink from "@/components/NextActiveLink";
import useResources from "@/hooks/useResources";
const LinksWrapperStyle = styled("li")(({ theme, trigger }) => ({
  position: "relative",
  "& > a": {
    height: 40,
    padding: "2px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "fit-content",
    justifyContent: "center",
    textTransform: "uppercase",
    fontSize: "0.85rem",
    fontWeight: 300,
    transition: "all 0.2s linear",
    color: "#fff",
    [theme.breakpoints.up("lg")]: {
      fontSize: "1rem",
    },
    "&:focus": {
      backgroundColor: "unset",
    },
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "0",
      height: "2px",
      backgroundColor: "#fff",
      transition: "all 0.2s linear",
    },
    "&:hover, &.active": {
      backgroundColor: "unset",
      color: "#fff",
      "&:after": {
        width: "100%",
      },
    },
  },
  "& .link": {
    fontSize: "0.85rem",
    textTransform: "uppercase",
    lineHeight: 1.75,
    height: 40,
    padding: "2px",
    fontWeight: 500,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    [theme.breakpoints.up("lg")]: {
      fontSize: "1rem",
    },
    "&:focus": {
      backgroundColor: "unset",
    },
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "0",
      height: "2px",
      backgroundColor: theme.palette.secondary.main,
      transition: "all 0.2s linear",
    },
    "&:hover, &.active": {
      backgroundColor: "unset",
      color: "#fff",
      "&:after": {
        width: "100%",
      },
    },
  },
  "& .dropdown-menu": {
    position: "absolute",
    boxShadow: theme.shadows[1],
    borderRadius: 0,
    minWidth: 160,
    maxWidth: 250,
    zIndex: 20,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    opacity: 0,
    paddingTop: 0,
    paddingBottom: 0,
    visibility: "hidden",
    transform: "translateY(10px)",
    transition: "0.25s ease-in-out",
    "& a": {
      transition: "0.25s linear",
      display: "block",
      width: "100%",
      textTransform: "uppercase",
      fontSize: "0.9rem",

      "&:before": {
        display: "block",
        position: "absolute",
        top: "0",
        right: "0",
        height: "100%",
        width: "0",
        content: "''",
        color: "#fff !important",
        background: "#000",
        transition: "all 0.4s cubic-bezier(0.42, 0, 0.58, 1)",
        zIndex: "-1",
      },
      "&:hover, &.active": {
        // backgroundColor: theme.palette.secondary.main,
        color: "#fff",
        "&:before": {
          width: "100%",
          color: "#fff !important",
        },
      },
    },
  },
  "&:hover": {
    "& .dropdown-menu": {
      opacity: 1,
      visibility: "visible",
      transform: "none",
    },
  },
}));

const DesktopLinks = ({ headerLinks, trigger }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={{ lg: 2 }}
      component="ul"
      display={{ xs: "none", md: "flex" }}
    >
      {headerLinks?.map((item) => (
        <LinksWrapperStyle key={item.id} trigger={trigger}>
          {item.hasDropdown ? (
            <>
              <span className="link">{useResources(item.label)}</span>
              <List className="dropdown-menu">
                {item?.dropdownLinks?.map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton component={NextActiveLink} href={item.href}>
                      {useResources(item.label)}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Button href={item.href} component={NextActiveLink} color="inherit">
              {useResources(item.label) ? (
                useResources(item.label)
              ) : (
                <Skeleton width={150} />
              )}
            </Button>
          )}
        </LinksWrapperStyle>
      ))}
    </Stack>
  );
};

export default DesktopLinks;
