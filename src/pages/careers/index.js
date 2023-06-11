import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import InnerBanner from "@/components/banners/InnerBanner";
import CareerItem from "@/components/items/CareerItem";
import useResources from "@/hooks/useResources";

const Careers = (props) => {
  const {
    locale = "en",
    bannerData,
    careersData,
    seoData,
    absoluteUrl,
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
        {Object.keys(bannerData)?.length !== 0 ? (
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

        <div style={{ paddingTop: 40, paddingBottom: 40 }}>
          <Container>
            {careersData?.length !== 0 ? (
              <Grid container spacing={3}>
                {careersData?.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <CareerItem item={item} />
                  </Grid>
                ))}
              </Grid>
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
        </div>
      </>
    </>
  );
};
export default Careers;

export const getServerSideProps = async ({ locale, resolvedUrl, req }) => {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/CareersPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Career/${process.env.COUNTRY_CODE}/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/Careers/Index`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: careersData },
      { Results: seoData },
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
        careersData: careersData || [],
        seoData: seoData || {},
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
