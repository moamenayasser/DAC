// Internal Imports
import Link from "next/link";
// MUI
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// Icons
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FaxOutlinedIcon from "@mui/icons-material/FaxOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// Components
import useResources from "@/hooks/useResources";

const ContactList = styled(List)(({ theme }) => ({
  "& li": {
    marginBottom: "10px",
    color: theme.palette.common.white,
  },
  "& svg": {
    color: theme.palette.common.white,
    marginRight: 10,
  },
  "& span": {
    "& .google-link": {
      display: "block",
      fontSize: "14px",
      position: "relative",
      width: "fit-content",
      transition: "all 0.2s linear",
      "&:before": {
        bottom: 0,
        position: "absolute",
        display: "block",
        content: '""',
        width: "100%",
        height: "1px",
        backgroundColor: theme.palette.common.white,
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
    "&:before": {
      bottom: "-3px",
      position: "absolute",
      display: "block",
      content: '""',
      width: 0,
      height: "1px",
      transition: "all 0.2s linear",
      backgroundColor: theme.palette.common.white,
    },
    "&:hover": {
      "&:before": {
        width: "100%",
      },
    },
  },
}));

const ContactInfo = ({ data }) => {
  return (
    <>
      <div className="section-title" data-aos="fade-up">
        <Typography
          variant="h2"
          component="h2"
          marginBottom="20px"
          marginTop="10px"
          color="#fff"
        >
          {useResources("contactUs")}
        </Typography>
      </div>

      <Typography
        variant="h6"
        component="h3"
        mt={3}
        color="#fff"
        fontWeight={700}
      >
        {data?.Branch}
      </Typography>
      <ContactList>
        {/* Location */}
        <ListItem disablePadding>
          <ListItemIcon style={{ minWidth: "auto" }}>
            <LocationOnOutlinedIcon />
          </ListItemIcon>
          <ListItemText mb={10}>
            {data?.Address}
            <Link
              className="google-link"
              href={data?.DirectionSrc}
              target="_blank"
            >
              {useResources("viewOnGoogleMap")}
            </Link>
          </ListItemText>
        </ListItem>

        {/* Phone */}
        {data?.Phone1 && (
          <ListItem disablePadding>
            <ListItemIcon style={{ minWidth: "auto" }}>
              <PhoneOutlinedIcon />
            </ListItemIcon>
            <ListItemText>
              <a href={`tel:${data?.Phone1}`}>{data?.Phone1}</a>
            </ListItemText>
          </ListItem>
        )}

        {/* Fax */}
        {data?.Phone2 && (
          <ListItem disablePadding>
            <ListItemIcon style={{ minWidth: "auto" }}>
              <FaxOutlinedIcon />
            </ListItemIcon>
            <ListItemText>
              <a href={`tel:${data?.Phone2}`}>{data?.Phone2}</a>
            </ListItemText>
          </ListItem>
        )}

        {/* Email1 */}
        <ListItem disablePadding>
          <ListItemIcon style={{ minWidth: "auto" }}>
            <MailOutlineIcon />
          </ListItemIcon>
          <ListItemText>
            <a href={`mailto:${data?.Email1}`}>{data?.Email1}</a>
          </ListItemText>
        </ListItem>

        {/* Email2 */}
        <ListItem disablePadding>
          <ListItemIcon style={{ minWidth: "auto" }}>
            <MailOutlineIcon />
          </ListItemIcon>
          <ListItemText>
            <a href={`mailto:${data?.Email2}`}>{data?.Email2}</a>
          </ListItemText>
        </ListItem>
      </ContactList>
    </>
  );
};

export default ContactInfo;
