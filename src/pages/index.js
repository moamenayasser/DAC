import Head from "next/head";
import dynamic from "next/dynamic";
import LazyLoad from "react-lazy-load";
import Skeleton from "@mui/material/Skeleton";
import Banner from "@/components/home/banner/Banner";
import AboutSection from "@/components/home/about/AboutSection";
import DivSec from "@/components/home/divSec";

const DynamicProjectsSection = dynamic(
  () => import("@/components/home/projects/ProjectsSection"),
  { loading: () => "Loading...", ssr: false }
);

const DynamicClientsSection = dynamic(
  () => import("@/components/home/clients/ClientsSection"),
  {
    loading: () => "Loading...",
    ssr: false,
  }
);

const DynamicContactSection = dynamic(
  () => import("@/components/home/contact/ContactSection"),
  {
    loading: () => "Loading...",
    ssr: false,
  }
);

const Home = (props) => {
  const {
    locale = "en",
    bannerData,
    WhoDacData,
    WhoDacContent,
    DivsData,
    projectsData,
    clientsData,
    contactData,
    seoData,
    absoluteUrl,
  } = props;
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
          <Banner locale={locale} data={bannerData} />
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: { xs: "70vh", md: "100vh", backgroundColor: "#333" },
            }}
          />
        )}

        {Object.keys(WhoDacData).length !== 0 && (
          <AboutSection
            data={WhoDacData}
            content={WhoDacContent}
            locale={locale}
          />
        )}
        {Object.keys(DivsData).length !== 0 && (
          <DivSec data={DivsData} locale={locale} />
        )}

        {projectsData?.length !== 0 && (
          <LazyLoad height={800} offset={100}>
            <DynamicProjectsSection data={projectsData} locale={locale} />
          </LazyLoad>
        )}

        {contactData.length !== 0 && (
          <LazyLoad height={500} offset={100}>
            <DynamicContactSection data={contactData} />
          </LazyLoad>
        )}

        {clientsData?.length !== 0 && (
          <LazyLoad height={500} offset={100}>
            <DynamicClientsSection locale={locale} data={clientsData} />
          </LazyLoad>
        )}
      </>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ locale, resolvedUrl, req }) => {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/HomePageBanner/${locale}`,
    // `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/WhoDac`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/whodac/${locale}/Category`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/whodac/${locale}/Category/whoweare/Content`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/divisions/${locale}/Content`,
    // `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/projects/${locale}/Category`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Projects/${locale}/ContentFeatured/3`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Clients/${locale}/Content`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/contactimage`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/Home/Index`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: WhoDacData },
      { Results: WhoDacContent },
      { Results: DivsData },
      { Results: projectsData },
      { Results: clientsData },
      { Results: contactData },
      { Results: seoData },
    ] = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url, {
          headers: {
            Authorization: process.env.AUTHORIZATION,
          },
        });

        if (res.status !== 200) throw new Error("SomeThing Wrong With API");

        return res.json();
      })
      );

    return {
      props: {
        bannerData: bannerData || [],
        WhoDacData: WhoDacData || [],
        WhoDacContent: WhoDacContent || [],
        DivsData: DivsData || [],
        projectsData: projectsData || [],
        clientsData: clientsData || [],
        contactData: contactData || {},
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
