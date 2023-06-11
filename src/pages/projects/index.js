import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InnerBanner from "@/components/banners/InnerBanner";
import EmptyItem from "@/components/projects/EmptyItem";
import ProjectItem from "@/components/items/ProjectItem";
import TitleItems from "@/components/projects/TitleItems";
import ProjectVideoIframe from "@/components/projects/ProjectVideoIframe";

const DynamicProjectsTabs = dynamic(
  () => import("@/components/projects/ProjectsTabs"),
  { ssr: false }
);

const DynamicDownloadProfileSec = dynamic(
  () => import("@/components/downloadProfile"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const Projects = (props) => {
  const {
    locale = "en",
    bannerData,
    specialitiesData,
    projectsData,
    projectsMedia,
    downloadProfileData,
    downloadformData,
    seoData,
    absoluteUrl,
  } = props;
  const specialitiesWithAll = [
    // { Name: "allProjects", UniqueName: "all" },
    ...specialitiesData,
  ];

  // Get the YoutubeLink
  const youtubeLinks = projectsMedia?.filter(
    (item) => item.TypeName === "YoutubeLink"
  );

  // Get the title and view website
  const itemLink = projectsMedia?.filter(
    (item) => item.TypeName === "Link" && item.Prima
  );

  const router = useRouter();
  const {
    query: { active },
  } = router;

  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(
      `/projects?active=${specialitiesWithAll[newValue]?.UniqueName}`
    );

    // ALL Projects
    // if (newValue === 0) {
    //   router.push("/projects");
    // } else {
    //   router.push(
    //     `/projects?active=${specialitiesWithAll[newValue]?.UniqueName}`
    //   );
    // }
  };

  useEffect(() => setIsLoading(false), []);

  useEffect(() => {
    if (active) {
      const getIndex = specialitiesWithAll.findIndex(
        (item) => item.UniqueName === active
      );

      setValue(getIndex);
    } else {
      setValue(0);
    }
  }, [active]);

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

        {isLoading ? (
          <Skeleton
            variant="rectangular"
            height={50}
            style={{ width: "100%", backgroundColor: "#000" }}
          />
        ) : (
          <DynamicProjectsTabs
            data={specialitiesWithAll}
            value={value}
            handleChange={handleChange}
          />
        )}

        <div style={{ paddingTop: 80, paddingBottom: 80 }}>
          <Container>
            <Grid container spacing={4}>
              {projectsData.length !== 0 &&
                projectsData?.map((item, index) => (
                  <Grid key={index} item sm={6} md={4}>
                    <ProjectItem item={item} />
                  </Grid>
                ))}

              {youtubeLinks &&
                youtubeLinks?.map((item, index) => (
                  <Grid key={index} item sm={6} md={6}>
                    <ProjectVideoIframe key={index} item={item} />
                  </Grid>
                ))}
            </Grid>

            {projectsData.length === 0 && youtubeLinks.length === 0 && (
              <EmptyItem />
            )}
          </Container>
        </div>

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
export default Projects;

export const getServerSideProps = async (ctx) => {
  const { locale, resolvedUrl, req, res, query } = ctx;
  const { active } = query;

  res && res.setHeader("Cache-Control", "no-store");

  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/ProjectsPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Projects/${locale}/Category`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/companyprofile`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/downloadform`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/Projects/Index`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: specialitiesData },
      { Results: downloadprofile },
      { Results: downloadform },
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

    let projectsData;
    let projectsMedia;

    if (active) {
      const isExist = specialitiesData.find(
        (item) => item.UniqueName === active
      );
      if (!isExist) {
        return {
          notFound: true,
        };
      }
      const url = `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Projects/${locale}/Category/${active}/Content`;

      const res = await fetch(url, {
        headers: {
          Authorization: process.env.AUTHORIZATION,
        },
      });
      const data = await res.json();
      projectsData = data?.Results;

      const mediaUrl = `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/projects/${locale}/Category/${active}/Media`;

      const resMedia = await fetch(mediaUrl, {
        headers: {
          Authorization: process.env.AUTHORIZATION,
        },
      });

      const Mediadata = await resMedia.json();
      projectsMedia = Mediadata?.Results;
    } else {
      return {
        redirect: {
          destination: `${locale}/projects?active=${specialitiesData[0].UniqueName}`,
          permanent: false,
        },
      };
      // const url = `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Projects/${locale}/Content`;

      // const res = await fetch(url, {
      //   headers: {
      //     Authorization: process.env.AUTHORIZATION,
      //   },
      // });

      // const data = await res.json();
      // projectsData = data?.Results;
    }

    return {
      props: {
        bannerData: bannerData[0] || {},
        specialitiesData: specialitiesData || [],
        projectsData: projectsData || [],
        projectsMedia: projectsMedia || [],
        downloadProfileData: downloadprofile || {},
        downloadformData: downloadform || {},
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
