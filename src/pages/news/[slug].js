import Head from "next/head";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InnerTitle from "@/components/InnerTitle";
import NextImage from "@/components/NextImage";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import useResources from "@/hooks/useResources";

const DynmaicInnerPrevNext = dynamic(
  () => import("@/components/InnerPrevNext"),
  { ssr: false }
);

const InnerNews = (props) => {
  const { previous, next, newsData, absoluteUrl, locale } = props;

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString([locale === "en" ? "en-us" : "ar-eg"], {
      month: "short",
    });
  }
  const specifiedDate = new Date(newsData.Date);
  const finalDate = `${specifiedDate.getDate()},  ${getMonthName(
    specifiedDate.getMonth()
  )}, ${specifiedDate.getFullYear()}`;

  return (
    <>
      <Head>
        <title>{newsData?.Name}</title>

        <meta name="description" content={newsData?.DescriptionShort} />
        <meta name="keywords" content={newsData?.Source2} />

        <meta property="og:title" content={newsData?.Name} />
        <meta property="og:description" content={newsData?.DescriptionShort} />
        <meta property="og:image" content={newsData?.ImageUrl} />
        <meta property="og:url" content={absoluteUrl} />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={newsData?.Name} />
        <meta name="twitter:description" content={newsData?.DescriptionShort} />
        <meta name="twitter:image" content={newsData?.ImageUrl} />
        <meta name="twitter:url" content={absoluteUrl} />
      </Head>

      <main>
        <div
          style={{
            paddingTop: 50,
            paddingBottom: 10,
            flexGrow: 1,
         
          }}
          // dir="ltr"
          className="multi"
        >
          <Container fixed>
            <InnerTitle title={newsData?.Name?.toLowerCase()} align="left" />
            <Box
                      display="flex"
                      justifyContent="flex-start"
                      
                    >

             <Typography display="flex" alignItems="center" mr={1} >
              {finalDate}   
            </Typography>
            |
            <Typography display="flex" alignItems="center" fontSize={12} ml={1}>  
            <PermIdentityOutlinedIcon fontSize="small" color="secondary" />
          {useResources("byAuthor")} {newsData.Auther1}
          </Typography>
          </Box>
            <Grid container  justifyContent="center">
              <Grid item xs={12} md={12}>
                <Card sx={{ borderRadius: 0, boxShadow: "unset" }}>
                  <CardMedia
                    sx={{
                      height: { md: "500px", xs: "200px" },
                      overflow: "hidden",
                      marginTop:"20px"
                    }}
                    className="card-img"
                  >
                    <NextImage
                      src={newsData.FeatureImageUrl}
                      width={1200}
                      height={500}
                      className="full-height full-img"
                      alt="news"
                      style={{ objectFit: "cover" }}
                    />
                  </CardMedia>
                  <CardContent
                    sx={{ paddingTop: "20px", position: "relative" }}
                  >
                  

                    <Typography
                      variant="h4"
                      component="h4"
                      mb={2}
                      sx={{ "&:hover": { color: "primary.main" } }}
                      textTransform="capitalize"
                    >
                      {newsData.DescriptionShort}
                    </Typography>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: newsData?.DescriptionLong,
                      }}
                    />
                  </CardContent>
                </Card>

                <DynmaicInnerPrevNext
                  previous={previous}
                  next={next}
                  all="/news"
                  locale={locale}
                  prevLabel="prevNews"
                  nextLabel="nextNews"
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
};
export default InnerNews;

InnerNews.customHeaderProps = () => ({
  color: "primary",
  position: "sticky",
  elevation: 1,
  style: {
    color: "#000",
  },
});

InnerNews.customTrigger = true;

export async function getServerSideProps({ locale, resolvedUrl, req, query }) {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;
  const { slug } = query;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/News/${locale}/Content/${slug}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/News/${locale}/Content`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/ProjectConfiguration`,
  ];

  try {
    const [{ Results: newsData }, { Results: allnewsData }, { Results: projectConfig }] = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url, {
          headers: {
            Authorization: process.env.AUTHORIZATION,
          },
        });
        return res.json();
      })
    );

    if (!newsData.Status) {
      return {
        notFound: true,
      };
    }

    let previous, next;

    for (let i = 0; i < allnewsData.length; i++) {
      if (allnewsData[i].UniqueName === newsData?.UniqueName) {
        previous = allnewsData[i - 1]?.UniqueName;
        next = allnewsData[i + 1]?.UniqueName;
      }
    }
    return {
      props: {
        previous: previous || "",
        next: next || "",
        newsData: newsData || {},
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
}
