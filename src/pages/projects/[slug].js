import dynamic from "next/dynamic";
import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InnerBanner from "@/components/banners/InnerBanner";
import Gallery from "../../components/projects/GalleryInners";
import NextImage from "@/components/NextImage";
import { InsertEmoticon } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const DynamicInnerPrevNext = dynamic(
  () => import("@/components/InnerPrevNext"),
  { ssr: false }
);

const BoxWrapper = styled(Box)(() => ({
  position: "relative",
  paddingBottom: "50px",
  "&:before": {
    content: "''",
    position: "absolute",
    left: "0",
    backgroundImage: "url(/images/texture.webp)",
    backgroundSize: "cover",
    backgroundPosition: "top",
    width: "100%",
    height: "65vh",
    zIndex: "-1",
  },
  "& img": {
    width: "100%", height: "450px", objectFit: "cover"
  },
  "& .inner-list li": {
    listStyleType: "square",
    marginLeft: "15px",
    color: "#4d4d4f",
    marginBottom: "5px"
  }
}));
const ProjectDetail = (props) => {
  const { previous, next, bannerData, projectData, absoluteUrl, locale } =
    props;

  const crumbs = [
    { title: bannerData?.Title, href: "/projects" },
    { title: projectData?.Name, href: "" },
  ];

  return (
    <>
      <Head>
        <title>{projectData?.Name}</title>
        {/* <title>{`${projectData?.Source1} | ${projectData?.Name}`}</title> */}
        <meta name="description" content={projectData?.DescriptionShort} />
        <meta name="keywords" content={projectData?.Source2} />{" "}
        {/* Edit later */}
        <meta property="og:title" content={projectData?.Name} />
        <meta
          property="og:description"
          content={projectData?.DescriptionShort}
        />
        <meta property="og:image" content={projectData?.ImageUrl} />
        <meta property="og:url" content={absoluteUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={projectData?.Name} />
        <meta
          name="twitter:description"
          content={projectData?.DescriptionShort}
        />
        <meta name="twitter:image" content={projectData?.ImageUrl} />
        <meta name="twitter:url" content={absoluteUrl} />
      </Head>


      <BoxWrapper flexGrow={1} pt={7} pb={7}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} position="relative">
              <div
                className="img-container"
                style={{ height: "400px", position: "relative" }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  mb={3}
                  mt={5}
                  color="primary"
                  fontFamily="acumin_en_font"
                  style={{
                    textTransform: "uppercase",
                    paddingTop: "20px",
                    marginBottom: "10px"
                  }}
                >
                  {projectData?.Name?.toLowerCase()}
                </Typography>
                {projectData?.AdvancedContentMedias.length > 1 ? (
                  <Gallery
                    locale={locale}
                    projects={projectData?.AdvancedContentMedias}
                  />
                ) : (
                  <NextImage
                    src={projectData?.ImageUrl}
                    alt={projectData?.Name}
                    width={600}
                    height={400}

                  />
                )}
              </div>
            </Grid>

            <Grid item xs={12} md={12} position="relative">
              <div style={{ paddingTop: "30px" }}>
                <Typography
                  variant="h4"
                  component="h2"
                  mb={3}
                  mt={5}
                  color="primary"
                  fontFamily="acumin_en_font"
                  style={{
                    textTransform: "capitalize",
                    paddingTop: "50px",
                    marginBottom: "10px"
                  }}
                >
                  {projectData?.DescriptionShort}
                </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: projectData.DescriptionLong,
                  }}
                />
              </div>
            </Grid>
          </Grid>

          <DynamicInnerPrevNext
            previous={previous}
            next={next}
            all={`/projects?active=${projectData.CategoryUniqueName}`}
            locale={locale}
            prevLabel="prevProject"
            nextLabel="nextProject"
          />
        </Container>
      </BoxWrapper>

    </>
  );
};
export default ProjectDetail;

export async function getServerSideProps({ locale, resolvedUrl, req, query }) {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;
  const { slug } = query;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/ProjectsPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/projects/${locale}/Content/${slug}`,
  ];

  try {
    const [{ Results: bannerData }, { Results: projectData }] =
      await Promise.all(
        urls.map(async (url) => {
          const res = await fetch(url, {
            headers: {
              Authorization: process.env.AUTHORIZATION,
            },
          });
          return res.json();
        })
      );

    if (!projectData.Status) {
      return {
        notFound: true,
      };
    }

    const categoryName = await fetch(
      `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Projects/${locale}/Category/${projectData.CategoryUniqueName}/Content`,
      {
        headers: {
          Authorization: process.env.AUTHORIZATION,
        },
      }
    );
    const projectCategoryName = await categoryName.json();
    const otherProject = projectCategoryName?.Results;

    let previous, next;

    for (let i = 0; i < otherProject.length; i++) {
      if (otherProject[i].UniqueName === slug) {
        previous = otherProject[i - 1]?.UniqueName;
        next = otherProject[i + 1]?.UniqueName;
      }
    }

    return {
      props: {
        previous: previous || "",
        next: next || "",
        bannerData: bannerData[0] || {},
        projectData: projectData || {},
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
