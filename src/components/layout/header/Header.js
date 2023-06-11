// Internal Imports
import { forwardRef } from "react";
// MUI
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
// Components
import BrandSection from "./BrandSection";
import DesktopLinks from "./DesktopLinks";
import UtilitySection from "./UtilitySection";

const Header = forwardRef((props, ref) => {
  const {
    headerLinks,
    locale,
    trigger,
    customTrigger = trigger,
    ...other
  } = props;

  return (
    <AppBar ref={ref} {...other} sx={{zIndex:"991"}}>
      <Container sx={{ py: 1 }}>
        <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
          <BrandSection trigger={customTrigger} />

          <DesktopLinks headerLinks={headerLinks} trigger={customTrigger} />

          <UtilitySection
            headerLinks={headerLinks}
            locale={locale}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Header;
