import Head from "next/head";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InnerBanner from "@/components/banners/InnerBanner";
import useResources from "@/hooks/useResources";
import ClientItem from "@/components/items/ClientItem";

const Clients = (props) => {
  const {
    locale = "en",
    bannerData,
    clientsData,
    allclientsData,
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
        {bannerData?.length !== 0 ? (
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
              height: { xs: "70vh", md: "100vh", backgroundColor: "#333" },
            }}
          />
        )}

        <div style={{ paddingTop: 80, paddingBottom: 80 }}>
          <Container fixed>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} position="relative" textAlign="center">
                <div className="section-title">
                  <Typography
                    variant="p"
                    component="p"
                    marginBottom="20px"
                    marginTop="10px"
                    maxWidth="700px"
                    margin="0 auto"
                  >
                    {allclientsData.DescriptionShort}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
              {clientsData?.map((item, index) => (
                <Grid item xs={6} sm={4} md={3} textAlign="center" key={index}>
                  <ClientItem item={item} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </>
    </>
  );
};
export default Clients;

export const getServerSideProps = async ({ locale, resolvedUrl, req }) => {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/ClientPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Clients/${locale}/Content`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Clients/${locale}/Category/Clients`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/Clients/Index`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: clientsData },
      { Results: allclientsData },
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
        clientsData: clientsData || [],
        allclientsData: allclientsData || [],
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
