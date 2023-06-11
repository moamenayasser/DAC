// MUI
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// Components
import NextImage from "../NextImage";
import { benton_en_font } from "@/utils/fonts";

const DescStyle = styled("div")(({ theme, locale }) => ({
  "& .title": {
    marginTop: 0,
    marginBottom: theme.spacing(2),
    fontSize: "calc(1.25rem + 0.25vw)",
    fontWeight: 400,
    fontFamily:
      locale === "ar" ? "inherit" : benton_en_font.style.fontFamily,
  },
  "& .desc": {
    padding: 0,
    margin: 0,
    listStyle: "none",
    position: "relative",
    "& .desc-item": {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      position: "relative",
      width: "100%",
      gap: theme.spacing(1),
      "& .icon": {
        color: "rgba(0, 0, 0, 0.54)",
        flexShrink: 0,
        display: "inline-flex",
        minWidth: 20,
        "& svg": {
          userSelect: "none",
          width: "1em",
          height: "1em",
          display: "inline-block",
          fill: "currentcolor",
          flexShrink: 0,
          transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          fontSize: "1.5rem",
          color: theme.palette.secondary.main,
        },
      },
      "& .info": {
        flex: "1 1 auto",
        minWidth: 0,
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
      },
    },
  },
}));

const ImageWrapper = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  height: 400,
  [theme.breakpoints.up("md")]: {
    height: 600,
  },
}));

const InfoSection = ({ data, locale }) => {

  return (
    <Container fixed style={{ paddingTop: 30, paddingBottom: 30 }} >
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} md={5} position="relative" style={{ paddingTop: 50, paddingLeft: 30}}  > 
          <Typography
            variant="h2"
            component="h2"
            marginBottom="20px"
            marginTop="10px"
            textTransform="capitalize"
          >
           {data?.Title}
          </Typography>

          <Typography variant="body1" component="p">
            {data?.DescriptionShort}
          </Typography>

          <DescStyle
            locale={locale}
            dangerouslySetInnerHTML={{ __html: data?.Description }}
          />
        </Grid>

        <Grid item xs={12} md={7} position="relative">
          <ImageWrapper className="img-container">
            <NextImage
              src={data?.ImageUrl}
              alt={data?.Alt}
              fill
              placeholder="blur"
            />
          </ImageWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InfoSection;
