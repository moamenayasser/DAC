import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SlideInHeader from "./header/SlideInHeader";
import Header from "./header/Header";
import ScrollToTop from "./ScrollToTop";
import { useData } from "@/hooks/useResources";

const DynamicFooter = dynamic(
  () => import("@/components/layout/footer/Footer"),
  { ssr: false }
);
const DynamicCopyRight = dynamic(
  () => import("@/components/layout/footer/CopyRight"),
  { ssr: false }
);

const cloneProps = (trigger) => ({
  color: trigger ? "primary" : "primary",
  position: "fixed",
  elevation: trigger ? 1 : 0,
  style: {
    color: trigger ? "#000" : "#fff",
  },
});

const Layout = (props) => {
  const { locale, headerProps = cloneProps, customTrigger, children } = props;

  const [scrollToTopTriggerHeight, setScrollToTopTriggerHeight] = useState(0);

  useEffect(() => {
    setScrollToTopTriggerHeight(window.innerHeight);
  }, []);

  const { webPages } = useData();

  const headerLinks = [
    {
      id: 1,
      label: "aboutUs",
      href: "/about",
      hasDropdown: false,
      dropdownLinks: [],
      status: webPages
        ? webPages?.find((item) => item.ControlName === "About")?.Status
        : false,
    },
    {
      id: 2,
      label: "Divisions",
      href: "/divisions",
      hasDropdown: false,
      dropdownLinks: [],
      status: webPages
        ? webPages?.find((item) => item.ControlName === "Divisions")?.Status
        : false,
    },
    {
      id: 3,
      label: "caseStudies",
      href: "",
      hasDropdown: true,
      dropdownLinks: [
        {
          id: 1,
          label: "listOfProjects",
          href: "/projects",
          hasDropdown: false,
          dropdownLinks: [],
          status: webPages
            ? webPages?.find((item) => item.ControlName === "Projects")?.Status
            : false,
        },
        {
          id: 2,
          label: "testimonials",
          href: "/testimonials",
          hasDropdown: false,
          dropdownLinks: [],
          status: webPages
            ? webPages?.find((item) => item.ControlName === "Testimonials")
                ?.Status
            : false,
        },
      ],
    },

    {
      id: 4,
      label: "mediaCenter",
      href: "",
      hasDropdown: true,
      dropdownLinks: [
        {
          id: 1,
          label: "pressReleases",
          href: "/news",
          hasDropdown: false,
          dropdownLinks: [],
          status: webPages
            ? webPages?.find((item) => item.ControlName === "News")?.Status
            : false,
        },
        {
          id: 2,
          label: "blogs",
          href: "/blogs",
          hasDropdown: false,
          dropdownLinks: [],
          status: webPages
            ? webPages?.find((item) => item.ControlName === "Blogs")?.Status
            : false,
        },
        {
          id: 3,
          label: "faq",
          href: "/faq",
          hasDropdown: false,
          dropdownLinks: [],
          status: webPages
            ? webPages?.find((item) => item.ControlName === "FAQ")?.Status
            : false,
        },
      ],
    },
    {
      id: 5,
      label: "certificates",
      href: "/certificates",
      hasDropdown: false,
      dropdownLinks: [],
      status: webPages
        ? webPages?.find((item) => item.ControlName === "Certificates")?.Status
        : false,
    },
    {
      id: 6,
      label: "contactUs",
      href: "/contact",
      hasDropdown: false,
      dropdownLinks: [],
      status: webPages
        ? webPages?.find((item) => item.ControlName === "ContactUs")?.Status
        : false,
    },
  ];

  const footerLinks = [
    {
      id: 1,
      title: "explore",
      links: [
        {
          id: 1,
          useRes: true,
          title: "aboutUs",
          href: "/about",
          status: webPages
            ? webPages?.find((item) => item.ControlName === "About")?.Status
            : false,
        },
        {
          id: 2,
          useRes: true,
          title: "projects",
          href: "/projects",
          status: webPages
            ? webPages?.find((item) => item.ControlName === "Projects")?.Status
            : false,
        },
        {
          id: 3,
          useRes: true,
          title: "testimonials",
          href: "/testimonials",
          status: webPages
            ? webPages?.find((item) => item.ControlName === "Testimonials")
                ?.Status
            : false,
        },
        {
          id: 4,
          useRes: true,
          title: "news",
          href: "/news",
          status: webPages
            ? webPages?.find((item) => item.ControlName === "News")?.Status
            : false,
        },
        {
          id: 5,
          useRes: true,
          title: "careers",
          href: "/careers",
          status: webPages
            ? webPages?.find((item) => item.ControlName === "Careers")?.Status
            : false,
        },
        {
          id: 6,
          useRes: true,
          title: "certificates",
          href: "/certificates",
          status: webPages
            ? webPages?.find((item) => item.ControlName === "Certificates")
                ?.Status
            : false,
        },
      ],
    },
  ];

  return (
    <>
      <div id="back-to-top-anchor"></div>

      <Stack minHeight="100vh" width="100%" justifyContent="space-between">
        <SlideInHeader cloneProps={headerProps}>
          <Header
            headerLinks={headerLinks}
            locale={locale}
            customTrigger={customTrigger}
          />
        </SlideInHeader>

        <main style={{ flexGrow: 1, width: "100%" }}>{children}</main>

        <DynamicFooter footerLinks={footerLinks} locale={locale} />

        <DynamicCopyRight />
      </Stack>

      <ScrollToTop
        target="#back-to-top-anchor"
        triggerOn={scrollToTopTriggerHeight}
        customStyle={{ bottom: 16, right: 16 }}
      >
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTop>
    </>
  );
};

export default Layout;
