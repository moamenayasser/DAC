import Head from "next/head";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { TransitionGroup } from "react-transition-group";
import Skeleton from "@mui/material/Skeleton";
import InnerBanner from "@/components/banners/InnerBanner";
import DivisionsPanel from "@/components/divisions/DivisionsPanel";
const DynamicDownloadProfileSec = dynamic(
  () => import("@/components/downloadProfile"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const DynamicDivisionsTabs = dynamic(
  () => import("@/components/divisions/DivisionsTabs"),
  {
    loading: () => (
      <Skeleton
        variant="rectangular"
        height={50}
        style={{ width: "100%", backgroundColor: "#000" }}
      />
    ),
    ssr: false,
  }
);

const DynamicClientsSection = dynamic(
  () => import("@/components/home/clients/ClientsSection"),
  {
    loading: () => "Loading...",
    ssr: false,
  }
);

const Divisions = (props) => {
  const {
    locale = "en",
    bannerData,
    DivisionsData,
    allDivisionsContent,
    InnerDivisionContent,
    clientsData,
    downloadProfileData,
    downloadformData,
    seoData,
    absoluteUrl,
  } = props;

  const router = useRouter();
  const {
    query: { active },
  } = router;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    router.push(
      `/divisions?active=${DivisionsData[newValue]?.UniqueName}`,
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (active) {
      const getIndex = DivisionsData.findIndex(
        (item) => item.UniqueName === active
      );
      setValue(getIndex || 0);
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

        <DynamicDivisionsTabs
          data={DivisionsData}
          value={value}
          handleChange={handleChange}
        />

        <Container sx={{ paddingTop: "50px", paddingBottom: "50px" }}>
          <div>
            <TransitionGroup>
              {allDivisionsContent?.map((item, index) => (
                <DivisionsPanel 
                  key={index}
                  index={index}
                  item={item}
                  value={value}
                  locale={locale}
                  itemContent={InnerDivisionContent}
                />
              ))}
            </TransitionGroup>
          </div>
        </Container>

        {clientsData?.length !== 0 && (
            <DynamicClientsSection locale={locale} data={clientsData}  />
        )}

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

export default Divisions;

export const getServerSideProps = async (ctx) => {
  const { locale, resolvedUrl, req, query } = ctx;
  const { active } = query;

  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/DivsPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/projects/${locale}/Category`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/Divisions/Index`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/Clients/${locale}/Content`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/companyprofile`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Section/${process.env.COUNTRY_CODE}/${locale}/downloadform`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: DivisionsData },
      { Results: seoData },
      { Results: clientsData },
      { Results: downloadprofile },
      { Results: downloadform },
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
    if (active) {
      const isExist = DivisionsData?.find((item) => item.UniqueName === active);
      if (!isExist) {
        return {
          notFound: true,
        };
      }
    }

    const allSpecialResC = await Promise.all(
      DivisionsData.map(async (item) => {
        const res = await fetch(
          `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/${item?.InstanceUniqueName}/${locale}/Category/${item.UniqueName}`,
          {
            headers: {
              Authorization: process.env.AUTHORIZATION,
            },
          }
        );
        return res.json();
      })
    );

    const allDivisionsContent = allSpecialResC?.map((item) => item.Results);

    const InnerDivision = await Promise.all(
      DivisionsData.map(async (item) => {
        const res = await fetch(
          `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/${item?.InstanceUniqueName}/${locale}/Category/${item.UniqueName}/content`,
          {
            headers: {
              Authorization: process.env.AUTHORIZATION,
            },
          }
        );
        return res.json();
      })
    );

    const InnerDivisionContent = InnerDivision?.map((item) => item.Results);
    // console.log("first"), InnerDivisionContent;
    return {
      props: {
        bannerData: bannerData[0] || {},
        DivisionsData: DivisionsData || [],
        allDivisionsContent: allDivisionsContent || [],
        InnerDivisionContent: InnerDivisionContent || [],
        seoData: seoData || {},
        clientsData: clientsData || [],
        downloadProfileData: downloadprofile || {},
        downloadformData: downloadform || {},
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
