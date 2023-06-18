import dynamic from "next/dynamic";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FaxOutlinedIcon from "@mui/icons-material/FaxOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import useResources from "@/hooks/useResources";

const CardBox = styled("div")(({ theme }) => ({
  position: "relative",
  height: "100%",
  width: "100%",
  transition: "all 0.2s linear",

  "& li": {
    marginBottom: "10px",
  },
  "& svg": {
    color: theme.palette.secondary.main,
    marginRight: 10,
    width: "25px",
    height: "25px",
    color: "#fff",
  },
}));

const ContactList = styled(List)(({ theme }) => ({
  "& span": {
    fontSize: ".8rem",
    "& .google-link": {
      display: "block",
      fontSize: "13px",
      position: "relative",
      width: "fit-content",
      transition: "all 0.2s linear",
      color: "#fff",

      "&:before": {
        bottom: 0,
        position: "absolute",
        display: "block",
        content: '""',
        width: "100%",
        height: "1px",
        backgroundColor: "#fff",
        transition: "all 0.2s linear",
      },

      "&:hover": {
        "&:before": {
          width: 0,
        },
      },
    },
  },
  "& a": {
    position: "relative",
    textDecoration: "none",
    "&:before": {
      bottom: "-3px",
      position: "absolute",
      display: "block",
      content: '""',
      width: 0,
      height: "1px",
      transition: "all 0.2s linear",
      backgroundColor: theme.palette.secondary.main,
    },
    "&:hover": {
      "&:before": {
        width: "100%",
      },
    },
  },
}));

const ContactItem = ({ item }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsLoading(false), []);

  return (
    <CardBox>
      <Typography component="h4" variant="h6" textTransform="capitalize">
        {useResources("reachUs")}
        {/* {item?.Branch?.toLowerCase()} */}
      </Typography>

      <ContactList>
        <ListItem disablePadding>
          <ListItemIcon style={{ minWidth: "auto" }}>
            <LocationOnOutlinedIcon />
          </ListItemIcon>
          <ListItemText mb={10}>
            {item?.Address}
            <Link
              className="google-link"
              href={item.DirectionSrc}
              target="_blank"
            >
              {useResources("viewOnGoogleMap")}
            </Link>
          </ListItemText>
        </ListItem>

        {/* Phone */}
        {item?.Phone1 && (
          <ListItem disablePadding>
            <ListItemIcon style={{ minWidth: "auto" }}>
              <PhoneOutlinedIcon />
            </ListItemIcon>
            <ListItemText>
              <a href={`tel:${item?.Phone1}`}>{item?.Phone1}</a>
            </ListItemText>
          </ListItem>
        )}

        {/* Fax */}
        {item?.Phone2 && (
          <ListItem disablePadding>
            <ListItemIcon style={{ minWidth: "auto" }}>
              <FaxOutlinedIcon />
            </ListItemIcon>
            <ListItemText>
              <a href={`tel:${item?.Phone2}`}>{item?.Phone2}</a>
            </ListItemText>
          </ListItem>
        )}

        {/* Email */}
        {item?.Email1 && (
          <ListItem disablePadding>
            <ListItemIcon style={{ minWidth: "auto" }}>
              <MailOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              <a href={`mailto:${item?.Email1}`}>{item?.Email1}</a>
            </ListItemText>
          </ListItem>
        )}
        {item?.Email2 && (
          <ListItem disablePadding>
            <ListItemIcon style={{ minWidth: "auto" }}>
              <MailOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              <a href={`mailto:${item?.Email2}`}>{item?.Email2}</a>
            </ListItemText>
          </ListItem>
        )}
      </ContactList>
    </CardBox>
  );
};

export default ContactItem;
