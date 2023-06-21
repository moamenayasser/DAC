import Head from "next/head";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import InnerBanner from "@/components/banners/InnerBanner";
import BlogCard from "@/components/blog/blogCard";
import useResources from "@/hooks/useResources";

const Blogs = (props) => {
  const { bannerData, locale = "en", blogsData, seoData, absoluteUrl } = props;

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
          className="multi"
        >
          <Container fixed>
            {blogsData?.length !== 0 ? (
              <Grid container spacing={{ xs: 4, sm: 3 }}>
                {blogsData?.map((item, index) => (
                  <Grid key={index} item xs={12}  md={6}>
                    <BlogCard data={item} locale={locale} />
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
export default Blogs;

export const getServerSideProps = async ({ locale, resolvedUrl, req }) => {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/BLogPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Blogs/${locale}/Content`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/Blogs/Index`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/ProjectConfiguration`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: blogsData },
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
        blogsData: blogsData || [],
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
