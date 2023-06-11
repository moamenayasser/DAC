import { useState, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/utils";

export const useContacts = (locale = "en") => {
    const [url, setUrl] = useState(`/api/contact?locale=${locale}`);

    useEffect(() => {
        setUrl(`${location.origin}/api/contact?locale=${locale}`);
    }, []);

    const { data } = useSWRImmutable(url, fetcher);

    return {
        data: data?.Results,
    };
};

export default useContacts;
