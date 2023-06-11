import Link from "next/link";
import dynamic from "next/dynamic";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import NextImage from "../NextImage";
import { gil_en_title_font } from "@/utils/fonts";
import CustomSwiper from "../swiper/CustomSwiper";
import "swiper/css/pagination";
import PlaceholderImg from "/public/images/placeholderDAC.webp";
import useResources from "@/hooks/useResources";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { getYoutubeUrl } from "@/utils";

const DynamicTabPanel = dynamic(() => import("./TabPanel"));

const DescStyle = styled("div")(({ theme, locale }) => ({
  marginBottom: 24,
  "& .title": {
    marginTop: 0,
    marginBottom: theme.spacing(2),
    fontSize: "calc(1.25rem + 0.25vw)",
    fontWeight: 400,
    fontFamily:
      locale === "ar" ? "inherit" : gil_en_title_font.style.fontFamily,
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

const options = {
  speed: 1000,
  spaceBetween: 20,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    clickable: true,
    type: "bullets",
    bulletActiveClass: "active",
    bulletClass: "dot",
    horizontalClass: "dots",
  },
  modules: [Autoplay, Pagination],
};

const DivisionsPanel = (props) => {
  const { value, index, item, locale, itemContent } = props;

  // Get the primary image
  const itemPrimaryImg = item?.AdvancedCategoryMedia?.filter(
    (el) => (el.TypeName === "Image" || el.TypeName === "Banner") && el.Prima
  );
  // Get the gallery images
  const itemGallery = item?.AdvancedCategoryMedia?.filter(
    (el) =>
      (el.TypeName === "Image" || el.TypeName === "Banner") &&
      !el.Prima &&
      el.Featured
  );
  // Get the (View Website) link
  const itemLinkFeatured = item?.AdvancedCategoryMedia?.find(
    (el) => el.TypeName === "Link" && !el.Prima && el.Featured
  );
  const itemVideo = item?.AdvancedCategoryMedia?.find(
    (el) => el.TypeName === "YoutubeLink" && el.Prima
  );

  const itemLinkPrima = item?.AdvancedCategoryMedia?.find(
    (el) => el.TypeName === "Link" && el.Prima && !el.Featured
  );
  const itemDocument = item?.AdvancedCategoryDocument[0];

  const itemBottons = itemContent.flat();

  const AllitemBottons = itemBottons.filter(
    (el) => el.CategoryUniqueName === item.UniqueName
  );


  return (
    <DynamicTabPanel value={value} index={index}>
      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          <Grid item xs={12} md={6}>
            <NextImage
              src={itemPrimaryImg[0]?.ActualImage}
              alt={itemPrimaryImg[0]?.Name}
              width={150}
              height={80}
              placeholder="blur"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div className="section-title">
              <Typography
                variant="h2"
                component="h2"
                marginBottom="20px"
                color="primary"
                style={{ fontSize: "28px", textTransform: "capitalize" }}
              >
                {item?.DescriptionShort?.toLowerCase()}
              </Typography>
            </div>

            <div className="inner-list">
              <div dangerouslySetInnerHTML={{ __html: item.DescriptionLong }} />
            </div>
            {itemDocument && (
              <Link
                style={{
                  textDecoration: "underline",
                  padding: "10px 0",
                  display: "block",
                  transition: "0.3s",
                  marginBottom: "20px",
                }}
                href={itemDocument?.URL}
                target="_blank"
              >
                <FileDownloadIcon
                  sx={{ width: "20px", marginBottom: "-7px" }}
                />
                {itemDocument?.Name}
              </Link>
            )}
            {itemLinkPrima && (
              <Button
                variant="standard"
                color="secondary"
                mt={8}
                mb={5}
                component={Link}
                href={itemLinkPrima.URL}
                style={{
                  marginRight: "5px",
                }}
              >
                {itemLinkPrima?.Name}
              </Button>
            )}
            {AllitemBottons.length !== 0 && (
              <Button
                variant="standard"
                color="secondary"
                mt={8}
                mb={5}
                component={Link}
                href={`/projects?active=${item.UniqueName}`}
              >
                {useResources("viewProjects")}
              </Button>
            )}
            {itemLinkFeatured?.URL &&
              itemLinkFeatured?.URL !== "#" &&
              AllitemBottons.length === 0 && (
                <Button
                  variant="standard"
                  color="secondary"
                  mt={8}
                  mb={5}
                  component={Link}
                  href={itemLinkFeatured.URL}
                >
                  {itemLinkFeatured?.Name}
                </Button>
              )}
          </Grid>

          <Grid item xs={12} md={6}>
            {itemGallery?.length !== 0 ? (
              <CustomSwiper locale={locale} {...options}>
                {itemGallery?.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    style={{ position: "relative", height: 400 }}
                  >
                    <NextImage
                      src={item.ActualImage}
                      alt={item.Name}
                      fill
                      placeholder="blur"
                    />
                  </SwiperSlide>
                ))}
              </CustomSwiper>
            ) :
              itemVideo?.YoutubeLink && (
                <SwiperSlide
                  key={index}
                  style={{ position: "relative", height: 400 }}
                >
                  <iframe
                    width="560"
                    height="100%"
                    src={getYoutubeUrl(itemVideo?.YoutubeLink)}
                    title={item.Name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>

                </SwiperSlide>
              )
            }

          </Grid>
        </Grid>
      </Container>
      <style jsx global>{`
        .inner-list li {
          list-style-type: square;
          margin-left: 15px;
          color: #4d4d4f;
          margin-bottom: 5px;
        }
      `}</style>
    </DynamicTabPanel>
  );
};

export default DivisionsPanel;
