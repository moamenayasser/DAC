import Head from "next/head";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import InnerBanner from "@/components/banners/InnerBanner";
import useResources from "@/hooks/useResources";
import CertificateItem from "@/components/items/CertificateItem";

const Certificate = (props) => {
  const {
    locale = "en",
    bannerData,
    certificatesData,
    allcertificatesData,
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

        <div style={{ paddingTop: 80, paddingBottom: 80 }}>
          <Container>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} position="relative" textAlign="center">
                <div className="section-title">
                  <Typography
                    variant="p"
                    component="p"
                    marginBottom="0px"
                    marginTop="10px"
                    maxWidth="700px"
                    margin="0 auto"
                  >
                    {allcertificatesData.DescriptionShort}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="center">
              {certificatesData?.map((item, index) => (
                <Grid item xs={12} sm={6} md={6} textAlign="center" key={index}>
                  <CertificateItem item={item} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </>
    </>
  );
};

export default Certificate;

export const getServerSideProps = async ({ locale, resolvedUrl, req }) => {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/CertificatesPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Certificate/${locale}/Content`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Certificate/${locale}/Category/certificates`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/Certificates/Index`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/ProjectConfiguration`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: certificatesData },
      { Results: allcertificatesData },
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
        certificatesData: certificatesData || [],
        allcertificatesData: allcertificatesData || {},
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
