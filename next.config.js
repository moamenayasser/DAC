// const fs = require("fs");
// const path = require("path");

module.exports = async (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */

  // try {
  //   const apiRes = await fetch(
  //     `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Retrieve`,
  //     { headers: { Authorization: process.env.AUTHORIZATION } }
  //   );

  //   if (apiRes.status !== 200) throw "Error from next config resources api";

  //   const apiData = await apiRes.json();

  //   global.staticData = apiData;
  // } catch (error) {
  //   console.log("Error from next.config", error);
  // }

  // const filePath = path.join(process.cwd(), "public", "resourses", "data.json");

  // try {
  //   if (!fs.existsSync(filePath)) {
  //     const apiRes = await fetch(
  //       `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Retrieve`,
  //       { headers: { Authorization: process.env.AUTHORIZATION } }
  //     );

  //     if (apiRes.status !== 200) throw "Error from next config resources api";

  //     const apiData = await apiRes.json();

  //     fs.writeFileSync(filePath, JSON.stringify(apiData));
  //     console.log("File created successfully!");
  //   } else {
  //     console.log("File already exist!");
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  const nextConfig = {
    i18n: {
      locales: ["en", "ar"],
      defaultLocale: "en",
      localeDetection: false,
    },
    images: { domains: ["api.node1.psdigitalme.com"] },
    webpack: (config, options) => {
      config.module.rules = [
        ...config.module.rules,
        {
          test: /node_modules[/\\]swiper\.esm\.js/,
          sideEffects: false,
        },
      ];

      return config;
    },
    async rewrites() {
      return [
        {
          source:
            "/(t|T)(e|E)(s|S)(t|T)(i|I)(m|M)(o|O)(n|N)(i|I)(a|A)(l|L)(s|S)",
          destination: "/testimonials",
        },
        {
          source: "/(f|F)(a|A)(q|Q)",
          destination: "/faq",
        },
        {
          source: "/(c|C)(o|O)(n|N)(t|T)(a|A)(c|C)(t|T)",
          destination: "/contact",
        },
        {
          source: "/(c|C)(l|L)(i|I)(e|E)(n|N)(t|T)(s|S)",
          destination: "/clients",
        },
        {
          source:
            "/(c|C)(e|E)(r|R)(t|T)(i|I)(f|F)(i|I)(c|C)(a|A)(t|T)(e|E)(s|S)",
          destination: "/certificates",
        },
        {
          source: "/(a|A)(b|B)(o|O)(u|U)(t|T)",
          destination: "/about",
        },
        {
          source:
            "/(s|S)(p|P)(e|E)(c|C)(i|I)(a|A)(l|L)(i|I)(t|T)(i|I)(e|E)(s|S)",
          destination: "/specialities",
        },
        {
          source: "/(p|P)(r|R)(o|O)(j|J)(e|E)(c|C)(t|T)(s|S)",
          destination: "/projects",
        },
        {
          source: "/(n|N)(e|E)(w|W)(s|S)",
          destination: "/news",
        },
        {
          source: "/(c|C)(a|A)(r|R)(e|E)(e|E)(r|R)(s|S)",
          destination: "/careers",
        },
        {
          source: "/(b|B)(l|L)(o|O)(g|G)(s|S)",
          destination: "/blogs",
        },
      ];
    },
  };

  return nextConfig;
};
