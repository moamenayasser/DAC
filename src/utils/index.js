// SWR Fetcher
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

// Get First Word
export const splitSentence = (data) => {
  const firstWord = data?.split(" ")[0];
  const rest = data?.split(" ")?.slice(1)?.join(" ");

  return [firstWord, rest];
};

//
export const getClientHost = () => {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  return origin;
};

export const getYoutubeUrl = (url) => {
  if (url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    const urlId = match && match[2].length === 11 ? match[2] : null;

    return `//www.youtube.com/embed/${urlId}`;
  }
};
