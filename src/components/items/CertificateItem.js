import Typography from "@mui/material/Typography";
import NextImage from "../NextImage";

const CertificateItem = ({ item }) => {
  return (
    <>
      <NextImage
        src={item.ImageUrl}
        alt={item.Name}
        width={400}
        height={500}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "auto",
        }}
        placeholder="blur"
      />

      <Typography mt={2} fontWeight={700} variant="h6" component="h6" textTransform="capitalize">
        {item?.DescriptionShort?.toLowerCase()}
      </Typography>
    </>
  );
};

export default CertificateItem;
