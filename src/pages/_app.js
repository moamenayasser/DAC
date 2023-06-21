import { useEffect } from "react";
import NextNProgress from "nextjs-progressbar";
import AOS from "aos";
import parse from "html-react-parser";
import MuiTheme from "@/utils/MuiTheme";
import Layout from "@/components/layout/Layout";
import "aos/dist/aos.css";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import Head from "next/head";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

const App = ({ Component, pageProps }) => {
  const locale = pageProps.locale || "en";

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        {pageProps.projectConfig?.Header &&
          parse(pageProps.projectConfig?.Header)}
      </Head>
      <MuiTheme locale={locale}>
        <NextNProgress
          color="#fff"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
         <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          hasBlendMode={true}
          outerStyle={{
            border: "2px solid #fff",
            mixBlendMode: "exclusion",
          }}
          innerStyle={{
            backgroundColor: "#fff",
            mixBlendMode: "exclusion",
          }}
        />

        <Layout
          locale={locale}
          headerProps={Component.customHeaderProps}
          customTrigger={Component.customTrigger}
        >
          <Component {...pageProps} />
        </Layout>
       
      </MuiTheme>

      {pageProps.projectConfig?.Footer &&
        parse(pageProps.projectConfig?.Footer)}

      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script> */}

      {/* <div
        dangerouslySetInnerHTML={{
          __html: `
        <script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"></script>
      `,
        }}
      /> */}
    </>
  );
};

export default App;
