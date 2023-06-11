// MUI
import Box from "@mui/material/Box";
// Componetns
import NextImage from "@/components/NextImage";

const ImageSection = ({ data }) => {
  return (
    <Box
      height={{ md: "600px", xs: "400px" }}
      mt={{ md: 0, xs: 5 }}
      overflow="hidden"
      className="img-container"
    >
      <NextImage
        src={data?.WebImageURL}
        alt={data?.ImageAlt}
        width={450}
        height={600}
        placeholder="blur"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </Box>
  );
};

export default ImageSection;
