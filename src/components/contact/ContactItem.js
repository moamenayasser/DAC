import dynamic from "next/dynamic";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
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

const DynamicContactIframe = dynamic(() => import("./ContactIframe"), {
  ssr: false,
});

const CardBox = styled("div")(({ theme }) => ({
  position: "relative",
  padding: "20px",
  height: "100%",
  width: "100%",
  transition: "all 0.2s linear",

  "& li": {
    marginBottom: "10px",
  },
  "& svg": {
    color: theme.palette.secondary.main,
    marginRight: 10,
    width: "30px",
    height: "30px",
  },

}));

const ContactList = styled(List)(({ theme }) => ({
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
        backgroundColor: theme.palette.secondary.main,
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

const ContactItem = ({ item}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsLoading(false), []);

  return (
    <Grid container spacing={1} >
      <Grid item xs={12} md={6}>
        <CardBox sx={{ paddingLeft: { md: "100px" }, paddingTop: { md: "50px" } }}>
          <Typography
            variant="h6"
            component="h2"
            mt={3}
            fontWeight={700}
            textTransform="capitalize"
          >
            {item?.Branch?.toLowerCase()}
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
      </Grid>

    

        <Grid item xs={12} md={6}>
          <div style={{ height: "100%", width: "100%", minHeight: 450 }}>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height={450}
                style={{ width: "100%" }}
              />
            ) : (
              <DynamicContactIframe item={item} />
            )}
          </div>
        </Grid>
    
    </Grid >
  );
};

export default ContactItem;
