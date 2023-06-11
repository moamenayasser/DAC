// Truncate text at specific line
export const truncateLines = (arrayOfLines) => {
  const props = arrayOfLines?.map((item) => ({
    props: { truncate: item },
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: item,
      lineClamp: item,
      WebkitBoxOrient: "vertical",
    },
  }));

  return props;
};
