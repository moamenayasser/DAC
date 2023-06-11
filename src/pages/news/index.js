import Head from "next/head";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import InnerBanner from "@/components/banners/InnerBanner";
import NewsCard from "@/components/news/NewsCard";
import useResources from "@/hooks/useResources";

const News = (props) => {
  const { locale = "en", bannerData, newsData, seoData, absoluteUrl } = props;

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

        <div
          style={{
            paddingTop: 80,
            paddingBottom: 80,
       
          }}
        >
          <Container>
            {newsData?.length !== 0 ? (
              <Grid container spacing={3}>
                {newsData?.map((item, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <NewsCard data={item} locale={locale} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Typography
                  variant="h1"
                  component="h2"
                  textAlign="center"
                  color="secondary.main"
                  mb={5}
                >
                  {useResources("commingSoon")}
                </Typography>

                <Button
                  href="https://sumouholding.com/sectors/construction/"
                  target="_blank"
                  rel="noopener"
                  variant="contained"
                >
                  {useResources("commingLink")}
                </Button>
              </div>
            )}
          </Container>
        </div>
      </>
    </>
  );
};
export default News;

export const getServerSideProps = async ({ locale, resolvedUrl, req }) => {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/NewsPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/News/${locale}/Content`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/News/Index`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: newsData },
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
        newsData: newsData || [],
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
