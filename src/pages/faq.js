import Head from "next/head";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import InnerBanner from "@/components/banners/InnerBanner";
import useResources from "@/hooks/useResources";

const Dynamicaccordion = dynamic(() => import("../components/faq/accordion"), {
  loading: () => "Loading...",
});

const FAQ = (props) => {
  const { locale = "en", bannerData, faqData, seoData, absoluteUrl } = props;

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

        <Box flexGrow={1} pt={7} pb={1}>
          <Container fixed>
            <Grid container spacing={3} mb={7}>
              <Grid item xs={12} md={12} position="relative">
                {faqData?.length !== 0 ? (
                  <Dynamicaccordion data={faqData} />
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
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    </>
  );
};
export default FAQ;

export const getServerSideProps = async ({ locale, resolvedUrl, req }) => {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/FAQPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/FAQ/${process.env.COUNTRY_CODE}/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/FAQ/Index`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/ProjectConfiguration`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: faqData },
      { Results: seoData },
      { Results: projectConfig },
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
        faqData: faqData || [],
        seoData: seoData || {},
        projectConfig: projectConfig || {},
        absoluteUrl,
        locale,
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
