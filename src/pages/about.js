import Head from "next/head";
import dynamic from "next/dynamic";
import LazyLoad from "react-lazy-load";
import InnerBanner from "@/components/banners/InnerBanner";
import WhoWeAreSection from "@/components/about/who-we-are/WhoWeAreSection";
import AboutMission from "@/components/about/AboutMission";

const DynamicCorporateStatement = dynamic(
  () => import("@/components/about/CorporateStatement"),
  { loading: () => "Loading..." }
);

const DynamicHoldingCompany = dynamic(
  () => import("@/components/about/HoldingCompany"),
  { loading: () => "Loading..." }
);

const DynamicParalexModal = dynamic(
  () => import("@/components/about/ParalexModal"),
  {
    loading: () => "Loading...",
    ssr: false,
  }
);

const About = (props) => {
  const {
    locale = "en",
    bannerData,
    whoWeAreData,
    teams,
    holdingCOMPANYSTRUCTURE,
    vision,
    mission,
    values,
    organizationChart,
    chartimg,
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
        {Object.keys(bannerData).length !== 0 && (
          <InnerBanner
            title={bannerData?.Title}
            imgSrc={bannerData?.Image}
            crumbs={crumbs}
          />
        )}

        {Object.keys(whoWeAreData).length !== 0 && (
          <WhoWeAreSection data={whoWeAreData} locale={locale} />
        )}

        {Object.keys({ teams }).length !== 0 && (
          <DynamicCorporateStatement teams={teams} locale={locale} />
        )}

        {Object.keys(holdingCOMPANYSTRUCTURE).length !== 0 && (
          <DynamicHoldingCompany
            data={holdingCOMPANYSTRUCTURE}
            locale={locale}
          />
        )}

        <AboutMission
          datavision={vision}
          datamission={mission}
          datavalue={values}
          locale={locale}
        />

        {Object.keys(organizationChart).length !== 0 && (
          <LazyLoad height={300} offset={100}>
            <DynamicParalexModal
              data={organizationChart}
              chartData={chartimg}
            />
          </LazyLoad>
        )}
      </>
    </>
  );
};

export default About;

export const getServerSideProps = async ({ locale, resolvedUrl, req }) => {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/AboutPageBanner/${locale}`,
    // `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/WHOWEARE`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/aboutVideo/${locale}/Category/whoweare`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Teams/${locale}/Content`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/HoldingCOMPANYSTRUCTURE`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/mission`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/Vision`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/Values`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/taamcompanyorganizationchart`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/chartimg`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/About/Index`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/ProjectConfiguration`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: whoWeAreData },
      { Results: teams },
      { Results: holdingCOMPANYSTRUCTURE },
      { Results: mission },
      { Results: vision },
      { Results: values },
      { Results: organizationChart },
      { Results: chartimg },
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
        whoWeAreData: whoWeAreData || {},
        teams: teams || {},
        holdingCOMPANYSTRUCTURE: holdingCOMPANYSTRUCTURE || {},
        vision: vision || {},
        mission: mission || {},
        values: values || {},
        organizationChart: organizationChart || {},
        chartimg: chartimg || {},
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
