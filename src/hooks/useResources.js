import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/utils";

export const useData = () => {
  const [url, setUrl] = useState("/api/resources");

  useEffect(() => {
    setUrl(`${location.origin}/api/resources`);
  }, []);

  const { data } = useSWRImmutable(url, fetcher);

  return {
    resources: data?.Results?.ProjectResource,
    socialMedia: data?.Results?.SocialMedia,
    url,
  };
};

const useResources = (key) => {
  const router = useRouter();
  const { locale } = router;

  const { resources: data, url } = useData();

  if (!data) return key;

  const resourcesForKey = data?.filter((item) => item.Name === key);

  if (resourcesForKey.length !== 0) {
    const resourcesWithLocale = resourcesForKey.find(
      (item) => item.LanguageCode === locale
    );

    return resourcesWithLocale?.Value;
  } else {
    // if (process.env.NODE_ENV === "development") {
    //   fetch(url, {
    //     method: "POST",
    //     body: key,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => console.log("New Key ", key, data))
    //     .catch((err) => console.log(err));
    // }

    return key;
  }
};

export default useResources;
