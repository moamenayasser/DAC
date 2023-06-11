import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// Internal Imports
import { useEffect, useState } from "react";

import DivStruc from "@/components/divStruc";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Divs = () => {

  //   const [loading, setLoading] = useState(true);

  const [value, setValue] = React.useState(0);

  //   useEffect(() => setLoading(false), []);
  //   if (loading) return <Loader />;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    
        <main>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
                allowScrollButtonsMobile="true"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#000",
                  },
                }}
                sx={{
                  "& .Mui-selected": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.common.white,
                  },
                  "& .MuiTabs-flexContainer": {
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                  },
                }}
              >
                <Tab
                  sx={{
                    color: "#000",
                    maxWidth: "100%",
                    minWidth: "auto",
                    p: "30px 100px",
                    fontFamily: "inherit",
                    "&.Mui-selected": {
                      color: (theme) => theme.palette.common.white,
                    },
                  }}
                  label="Align Management"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{
                    color: "#000",
                    maxWidth: "100%",
                    minWidth: "auto",
                    p: "30px 100px",
                    fontFamily: "inherit",
                    "&.Mui-selected": {
                      color: (theme) => theme.palette.common.white,
                    },
                  }}
                  label="BCT Contracting"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{
                    color: "#000",
                    maxWidth: "100%",
                    minWidth: "auto",
                    p: "30px 100px",
                    fontFamily: "inherit",
                    "&.Mui-selected": {
                      color: (theme) => theme.palette.common.white,
                    },
                  }}
                  label="TAAM"
                  {...a11yProps(2)}
                />
                <Tab
                  sx={{
                    color: "#000",
                    maxWidth: "100%",
                    minWidth: "auto",
                    p: "30px 100px",
                    fontFamily: "inherit",
                    "&.Mui-selected": {
                      color: (theme) => theme.palette.common.white,
                    },
                  }}
                  label="DAC Group"
                  {...a11yProps(3)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <DivStruc />
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>
            <TabPanel value={value} index={2}>
            </TabPanel>
            <TabPanel value={value} index={3}>
            </TabPanel>
          </Box>
        </main>
    </>
  );
};
export default Divs;

