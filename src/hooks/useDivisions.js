import { useState, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/utils";

export const useDivisions = (locale = "en") => {
  const [url, setUrl] = useState(`/api/divisions?locale=${locale}`);

  useEffect(() => {
    setUrl(`${location.origin}/api/divisions?locale=${locale}`);
  }, []);

  const { data } = useSWRImmutable(url, fetcher);

  return {
    data: data?.Results,
  };
};

export default useDivisions;
