// MUI
import { deepmerge } from "@mui/utils";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// External Imports
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
// Components
import { truncateLines } from "./MuiHelpers";
// Fonts
import { benton_en_font, changa_ar_font, acumin_en_font } from "./fonts";

const globalOptions = {
  direction: "ltr",
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#000",
    },
    text: {
      main: "#777",
      secondary: "#bdbdbd",
    },
  },
  typography: {
    fontFamily: acumin_en_font.style.fontFamily,
    fontSize: 14,
    h1: {
      fontFamily: benton_en_font.style.fontFamily,
      fontSize: 60,
      fontWeight:600
    },
    h2: {
      fontFamily: benton_en_font.style.fontFamily,
      fontSize: 30,
      fontWeight:500
    },
    h3: {
      fontFamily: benton_en_font.style.fontFamily,
      fontWeight:600
    },
    h4: {
      fontFamily: benton_en_font.style.fontFamily,
      fontSize: 25,
    },
    h5: {
      fontFamily: benton_en_font.style.fontFamily,
      fontWeight:700,
    },
    h6: {
      fontFamily: benton_en_font.style.fontFamily,
    },
    
  },
  components: {
    MuiTypography: {
      variants: truncateLines([1, 2, 3, 4, 5]),
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "15px 40px",
          borderRadius: 0,
          fontSize: 14,
          color: "#000",
          justifyContent: "center",
          position: "relative",
          border: "2px solid #000",
          transition: "all 0.4s cubic-bezier(0.42, 0, 0.58, 1)",
          height: "50px",
          lineHeight: "50px",
          padding: "0 40px",
          zIndex: "1",
          background:"transparent",
          textTransform: "uppercase",
          "&:after": { height: "100%", color: "#fff", zIndex: "-1", "content": "''", },
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
            zIndex: "-1"

          },
          "&:hover": {
            "&:after": {
              width: "auto",
              left: "0",
              right: "auto"
            },
            "&:before": {
              width: "100%",
              color: "#fff !important",
              
            },

            color: "#fff ",
          },
          "@media screen and (max-width: 768px)": {
            padding: "10px 20px",
            fontSize: 12,
          },
        },
          outlined: {border: "2px solid #fff",
          color: "#fff ",
          "&:after": {  color: "#000"},
          "&:hover": {
           
            "&:before": {
              color: "#000",
              background: "#fff",
            },

            color: "#000 ",
          },
        },
        contained: {
          boxShadow:"none",
          color: "#fff",
          backgroundColor: "#000",
          "&:after": {  color: "#000"},
          "&:hover": {
           
            "&:before": {
              color: "#000",
              background: "#fff",
            },

            color: "#000 ",
          },
          // border: "2px solid #fff",

          // "&:hover": {
          //   color: "#000",
          //   backgroundColor: "#fff",
          //   boxShadow: "unset",
          //   borderColor: "#000",
          // },
        },
        // outlined: {
        //   color: "#fff",
        //   background: "trancperent",
        //   border: "2px solid #fff",
        //   boxShadow: "unset",

        //   "&:hover": {
        //     color: "#000",
        //     backgroundColor: "#fff",
        //     border: "2px solid #fff",
        //     boxShadow: "unset",
        //   },
        // },
        // secondOutlined: {
        //   color: "#000",
        //   backgroundColor: "#fff",
        //   border: "2px solid #fff",
        //   boxShadow: "none",

        //   "&:hover": {
        //     color: "#fff",
        //     backgroundColor: "#000",
        //     border: "2px solid #000",
        //     boxShadow: "none",
        //   },
        // },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 400,
          maxWidth: "100%",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: "2px solid #fff",
      
          borderRadius: "0",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        
          "&:after": {
            display: "none",
          },

          "&::placeholder": {
            color: "#000",
          },

          "& input": {
            padding: "5px",
            
          },
          "& svg": {
            fill: "#fff",
            
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          color: "#fff",
          position: "relative !important",
          top: "-2px !important",

          "&.Mui-focused" :{
            top:"20px !important"
          }
          ,
          "&.MuiFormLabel-filled" :{
            top:"20px !important"
          }
          
        },
      },
    },
  },
};

const theme = responsiveFontSizes(createTheme(deepmerge(globalOptions, {})));

const rtlTheme = responsiveFontSizes(
  createTheme(
    deepmerge(globalOptions, {
      direction: "rtl",
      typography: {
        fontFamily: changa_ar_font.style.fontFamily,
        fontSize: 14,
        h1: {
          fontFamily: changa_ar_font.style.fontFamily,
        },
        h2: {
          fontFamily: changa_ar_font.style.fontFamily,
        },
        h3: {
          fontFamily: changa_ar_font.style.fontFamily,
        },
        h4: {
          fontFamily: changa_ar_font.style.fontFamily,
        },
        h5: {
          fontFamily: changa_ar_font.style.fontFamily,
        },
        h6: {
          fontFamily: changa_ar_font.style.fontFamily,
        },
      },
    })
  )
);

const MuiTheme = ({ children, locale }) => {
  const cacheRtl = createCache({
    key: locale === "ar" ? "muirtl" : "muiltr",
    stylisPlugins: locale === "ar" && [prefixer, rtlPlugin],
  });

  const directionTheme = locale === "ar" ? rtlTheme : theme;

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={directionTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MuiTheme;
