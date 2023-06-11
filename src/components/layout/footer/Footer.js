// Internal Imports
import { useState, useEffect } from "react";
import NextImage from "@/components/NextImage";
// MUI
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// Components
import LogoSection from "./LogoSection";
import FooterDesktopLinks from "./FooterDesktopLinks";
import NewsLetterSection from "./NewsLetterSection";
// Images
import ContactImg from "/public/images/contact-pattern.webp";
import ContactItem from "./ContactItem";
import useContacts from "@/hooks/useContacts";

const FooterWrapperStyle = styled("footer")(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  position: "relative",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  "& .bgimg": {
    opacity: ".1"
  }

}));

const Footer = (props) => {
  const { footerLinks, locale } = props;
  const { data: contactData } = useContacts(locale);

  const matches = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(matches);

  useEffect(() => {
    if (!matches) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [matches]);

  const handleClick = (index) => {
    if (!matches) {
      if (open === index) {
        setOpen(false);
      } else {
        setOpen(index);
      }
    }
  };
  return (
    <FooterWrapperStyle>
      <NextImage src={ContactImg} alt="Footer Background" fill className="bgimg" />

      <Container>
        <Grid container spacing={2} position="relative">
          <Grid item xs={12} md={4} lg={3}>
            <LogoSection />
          </Grid>

          {footerLinks?.map((item, index) => (
            <Grid key={index} item xs={12} lg={2} justifyContent="start" display="flex">
              <FooterDesktopLinks
                data={item}
                handleClick={handleClick}
                index={index}
                matches={matches}
                open={open}
              />
            </Grid>
          ))}

          {contactData && (
            <Grid item xs={12} lg={4} pr={1}>
              <ContactItem item={contactData?.find(item => item.IsMain)} showIframe={false} />
            </Grid>
          )}

          <Grid item xs={12} sm={6} lg>
            <Box>
              <NewsLetterSection locale={locale} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FooterWrapperStyle>
  );
};

export default Footer;
