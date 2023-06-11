import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import InnerBanner from "@/components/banners/InnerBanner";
import useResources from "@/hooks/useResources";
import TestimonialsItem from "@/components/items/TestimonialsItem";
import dynamic from "next/dynamic";
const DynamicDownloadProfileSec = dynamic(
  () => import("@/components/downloadProfile"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const Testimonials = (props) => {
  const {
    locale = "en",
    bannerData,
    testimonialsData,
    seoData,
    absoluteUrl,
    downloadProfileData,
    downloadformData,
  } = props;
  const crumbs = [{ title: bannerData?.Title, href: "" }];

  return (
    <>
      <Head>
        <title>{seoData?.PageTitle}</title>
        <meta name="description" content={seoData?.PageDescription} />
        <meta name="keywords" content={seoData?.PageKeywords} />

        <meta property="og:title" content={seoData?.OGtitle} />
        <meta property="og:description" content={seoData?.OGdescription} />
        <meta property="og:image" content={seoData?.OGimage} />
        <meta property="og:url" content={absoluteUrl} />
        <meta property="og:type" content={seoData?.OGtype} />

        <meta name="twitter:title" content={seoData?.Twittertitle} />
        <meta
          name="twitter:description"
          content={seoData?.Twitterdescription}
        />
        <meta name="twitter:image" content={seoData?.Twitterimage} />
        <meta name="twitter:url" content={absoluteUrl} />
      </Head>
      <>
        {Object.keys(bannerData).length !== 0 ? (
          <InnerBanner
            imgSrc={bannerData?.Image}
            title={bannerData?.Title}
            crumbs={crumbs}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: { xs: 300, md: 400, backgroundColor: "#333" },
            }}
          />
        )}

        <Box flexGrow={1} pt={7} pb={15} className="multi" position="relative">
          <Container fixed sx={{ position: "relative" }}>
            {testimonialsData?.length !== 0 ? (
              <>
                {testimonialsData?.map((item, index) => (
                  <TestimonialsItem item={item} key={index} />
                ))}
              </>
            ) : (
              <Typography
                component="h2"
                variant="h1"
                color="secondary.main"
                textAlign="center"
              >
                {useResources("commingSoon")}
              </Typography>
            )}
          </Container>
        </Box>

        {Object.keys(downloadProfileData).length !== 0 && (
          <DynamicDownloadProfileSec
            data={downloadProfileData}
            popData={downloadformData}
          />
        )}
      </>
    </>
  );
};
export default Testimonials;

export const getServerSideProps = async ({ locale, resolvedUrl, req }) => {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/TestimonialsPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Testimonial/${process.env.COUNTRY_CODE}/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/Testimonials/Index`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/companyprofile`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/downloadform`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: testimonialsData },
      { Results: seoData },
      { Results: downloadprofile },
      { Results: downloadform },
    ] = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url, {
          headers: {
            Authorization: process.env.AUTHORIZATION,
          },
        });
        return res.json();
      })
    );

    return {
      props: {
        bannerData: bannerData[0] || {},
        testimonialsData: testimonialsData || [],
        seoData: seoData || {},
        absoluteUrl,
        locale,
        downloadProfileData: downloadprofile || {},
        downloadformData: downloadform || {}
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: `${locale}/500`,
        permanent: false,
      },
    };
  }
};
