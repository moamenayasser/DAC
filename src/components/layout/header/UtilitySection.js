// Internal Imports
import { useState } from "react";
import dynamic from "next/dynamic";
// MUI
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
// Components
import LangSwitch from "@/components/LangSwitch";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SocialItems from "./SocialItems";
import { useData } from "@/hooks/useResources";

const LazyMobileDrawer = dynamic(() => import("./MobileDrawer"), {
  ssr: false,
});

const UtilitySection = (props) => {
  const { headerLinks, locale } = props;
  const { socialMedia } = useData();


  const [open, setOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen((prev) => !prev);
  };

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Box display={{ xs: "none", md: "flex" }} gap={1}>
        <SocialItems socialIcons={socialMedia} />
      </Box>
      <LangSwitch sx={{ display: { xs: "none", md: "flex" }, color: "#fff" }} locale={locale} />
      <Box display={{ md: "none" }}>
        <IconButton
          color="inherit"
          aria-label="menu"
          size="small"
          sx={{ display: { md: "none" } }}
          onClick={toggleDrawer}
        >
          <MenuIcon style={{ fontSize: "2.2rem" , fill:"#fff"}} />
        </IconButton>

        <LazyMobileDrawer
          headerLinks={headerLinks}
          locale={locale}
          open={open}
          toggleDrawer={toggleDrawer}
        />
      </Box>
    </Stack>
  );
};

export default UtilitySection;
