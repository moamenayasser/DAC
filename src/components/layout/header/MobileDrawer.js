import Image from "next/image";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NextActiveLink from "@/components/NextActiveLink";
import LangSwitch from "@/components/LangSwitch";
import SocialItems from "./SocialItems";
import useResources, { useData } from "@/hooks/useResources";
import LogoImg from "/public/images/logo-header.webp";

const AccordionStyle = styled(Accordion)(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-root": {
    minHeight: "auto",
    "&.Mui-expanded": {
      minHeight: "auto",
    },
    "& .MuiAccordionSummary-content": {
      margin: "8px 0",
    },
  },
  "& a.active": {
    color: theme.palette.secondary.main,
  },
}));

const MobileDrawer = (props) => {
  const { headerLinks, locale, open, toggleDrawer } = props;

  const { socialMedia } = useData();

  return (
    <Box display={{ md: "none" }}>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
            backgroundColor:"#000",
          
          }}
        >
          <NextActiveLink
            href="/"
            style={{ display: "flex" }}
            onClick={toggleDrawer}
          >
            <Image
              src={LogoImg}
              alt={useResources("DACLogo")}
              height={70}
              style={{ width: "auto" }}
            />
          </NextActiveLink>

          <IconButton
            aria-label={useResources("close")}
            size="large"
            onClick={toggleDrawer}
            sx={{color:"#fff"}}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {headerLinks?.length !== 0 && (
          <List>
            {headerLinks?.map((item) => (
              <ListItem key={item.id} disablePadding>
                {item.hasDropdown ? (
                  <AccordionStyle style={{ flexGrow: 1 }} elevation={0}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`mobile-nav-${item.label}-content`}
                      id={`mobile-nav-${item.label}-header`}
                      style={{ margin: "0 !important" }}
                    >
                      <Typography textTransform="capitalize">
                        {item.label}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <List disablePadding>
                        {item?.dropdownLinks?.map((item) => (
                          <ListItem
                            key={item.id}
                            disablePadding
                            style={{
                              textTransform: "capitalize",
                              fontSize: "0.85rem",
                            }}
                          >
                            <ListItemButton
                              component={NextActiveLink}
                              href={item.href}
                              onClick={toggleDrawer}
                            >
                              {useResources(item.label)}
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </AccordionStyle>
                ) : (
                  <ListItemButton
                    component={NextActiveLink}
                    href={item.href}
                    sx={{
                      textTransform: "capitalize",
                      "&.active": { color: "secondary.main" },
                    }}
                    onClick={toggleDrawer}
                  >
                    {useResources(item.label)}
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
        )}

        <Stack p={2} gap={2}>
          {socialMedia && (
            <Stack direction="row" alignItems="center" gap={2}>
              <SocialItems socialIcons={socialMedia} color="primary" />
            </Stack>
          )}

          <Stack direction="row" alignItems="center" gap={2}>
            <LanguageIcon />
            <LangSwitch sx={{ flexGrow: 1 }} locale={locale} />
          </Stack>
        </Stack>
      </Drawer>
    </Box>
  );
};

export default MobileDrawer;
