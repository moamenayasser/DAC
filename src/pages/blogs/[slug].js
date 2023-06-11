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

const Innerblogs = (props) => {
  const { previous, next, blogsData, absoluteUrl, locale } = props;

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString([locale === "en" ? "en-us" : "ar-eg"], {
      month: "short",
    });
  }
  const specifiedDate = new Date(blogsData.Date);
  const finalDate = `${specifiedDate.getDate()},  ${getMonthName(
    specifiedDate.getMonth()
  )}, ${specifiedDate.getFullYear()}`;

  return (
    <>
      <Head>
        <title>{blogsData?.Name}</title>

        <meta name="description" content={blogsData?.DescriptionShort} />
        <meta name="keywords" content={blogsData?.Source2} />

        <meta property="og:title" content={blogsData?.Name} />
        <meta property="og:description" content={blogsData?.DescriptionShort} />
        <meta property="og:image" content={blogsData?.ImageUrl} />
        <meta property="og:url" content={absoluteUrl} />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={blogsData?.Name} />
        <meta name="twitter:description" content={blogsData?.DescriptionShort} />
        <meta name="twitter:image" content={blogsData?.ImageUrl} />
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
            <InnerTitle title={blogsData?.Name?.toLowerCase()} align="left" />
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
          {useResources("byAuthor")} {blogsData.Auther1}
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
                      src={blogsData.FeatureImageUrl}
                      width={1200}
                      height={500}
                      className="full-height full-img"
                      alt="blogs"
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
                      {blogsData.DescriptionShort}
                    </Typography>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogsData?.DescriptionLong,
                      }}
                    />
                  </CardContent>
                </Card>

                <DynmaicInnerPrevNext
                  previous={previous}
                  next={next}
                  all="/blogs"
                  locale={locale}
                  prevLabel="prevblogs"
                  nextLabel="nextblogs"
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
};
export default Innerblogs;

Innerblogs.customHeaderProps = () => ({
  color: "primary",
  position: "sticky",
  elevation: 1,
  style: {
    color: "#000",
  },
});

Innerblogs.customTrigger = true;

export async function getServerSideProps({ locale, resolvedUrl, req, query }) {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;
  const { slug } = query;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/blogs/${locale}/Content/${slug}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/blogs/${locale}/Content`,
  ];

  try {
    const [{ Results: blogsData }, { Results: allblogsData }] = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url, {
          headers: {
            Authorization: process.env.AUTHORIZATION,
          },
        });
        return res.json();
      })
    );

    if (!blogsData.Status) {
      return {
        notFound: true,
      };
    }

    let previous, next;

    for (let i = 0; i < allblogsData.length; i++) {
      if (allblogsData[i].UniqueName === blogsData?.UniqueName) {
        previous = allblogsData[i - 1]?.UniqueName;
        next = allblogsData[i + 1]?.UniqueName;
      }
    }
    return {
      props: {
        previous: previous || "",
        next: next || "",
        blogsData: blogsData || {},
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
