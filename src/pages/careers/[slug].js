import Head from "next/head";
import Skeleton from "@mui/material/Skeleton";
import InnerBanner from "@/components/banners/InnerBanner";
import ApplySection from "@/components/career/ApplySection";
import InfoSection from "@/components/career/InfoSection";

const InnerCareer = (props) => {
  const { locale = "en", bannerData, careersData, absoluteUrl } = props;

  const crumbs = [
    { title: bannerData?.Title, href: "/careers" },
    { title: careersData?.Title, href: "" },
  ];

  return (
    <>
      <Head>
        <title>{`${careersData?.PageTittle}`}</title>
        <meta name="description" content={careersData?.PageDescription} />
        <meta name="keywords" content={careersData?.PageKeywords} />

        <meta property="og:title" content={careersData?.OGtitle} />
        <meta property="og:description" content={careersData?.OGdescription} />
        <meta property="og:image" content={careersData?.OGimage} />
        <meta property="og:url" content={absoluteUrl} />
        <meta property="og:type" content={careersData?.OGtype} />

        <meta name="twitter:title" content={careersData?.Twittertitle} />
        <meta
          name="twitter:description"
          content={careersData?.Twitterdescription}
        />
        <meta name="twitter:image" content={careersData?.Twitterimage} />
        <meta name="twitter:url" content={absoluteUrl} />
      </Head>

      <>
        {Object.keys(bannerData)?.length !== 0 ? (
          <InnerBanner
            imgSrc={bannerData?.Image}
            title={careersData?.Title}
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

        <InfoSection data={careersData} locale={locale} />
        <ApplySection />
      </>
    </>
  );
};

export default InnerCareer;

export const getServerSideProps = async (props) => {
  const { locale, resolvedUrl, req, query } = props;

  const absoluteUrl = req.headers.host + resolvedUrl + locale;
  const { slug } = query;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/CareersPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Career/${process.env.COUNTRY_CODE}/${locale}/${slug}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/ProjectConfiguration`,
  ];

  try {
    const [{ Results: bannerData }, { Results: careersData }, { Results: projectConfig }] =
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

    if (!careersData) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        bannerData: bannerData[0] || {},
        careersData: careersData || {},
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
