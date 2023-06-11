import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import InnerBanner from "@/components/banners/InnerBanner";
import useResources from "@/hooks/useResources";
import ContactItem from "@/components/contact/ContactItem";

const DynamicContactForm = dynamic(
  () => import("@/components/contact/ContactForm"),
  {
    ssr: false,
    loading: () => "Loading...",
  }
);

const Contact = (props) => {
  const { bannerData, contactData, seoData, absoluteUrl, locale } = props;

  const crumbs = [{ title: bannerData?.Title, href: "" }];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsLoading(false), []);

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

        {contactData?.length !== 0 && (
       
            <>
              {contactData?.map(
                (item, index) =>
                  item.Status && <ContactItem key={index} item={item} />
              )}
            </>
          
        )}

        <div
          style={{
            paddingTop: 56,
            paddingBottom: 56,
            backgroundColor: "#f8f8f8",

          }}
        >
          <Container fixed sx={{ maxWidth:{md: "64%" }}} justifyContent="center" className="black">
            <Typography
              variant="h4"
              component="h3"
              marginBottom="20px"
              color="primary"
              textTransform="capitalize"
            >
              {useResources("contactTitle")}{" "}
            </Typography>
            {!isLoading && <DynamicContactForm />}
          </Container>
        </div>
      </>
    </>
  );
};

export default Contact;

export const getServerSideProps = async ({ locale, resolvedUrl, req }) => {
  const absoluteUrl = req.headers.host + resolvedUrl + locale;

  const urls = [
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/ContactPageBanner/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/ContactInformation/${locale}`,
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/ContactUs/Index`,
  ];

  try {
    const [
      { Results: bannerData },
      { Results: contactData },
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

    return {
      props: {
        bannerData: bannerData[0] || {},
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
