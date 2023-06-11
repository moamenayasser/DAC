import Typography from "@mui/material/Typography";
import useResources from "@/hooks/useResources";
import NextImage from "../NextImage";
import PlaceholderImg from "/public/images/placeholderDAC.webp";

const EmptyItem = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <NextImage
        src={PlaceholderImg}
        alt="placeholder"
        width={200}
        height={200}
        style={{ objectFit: "contain" }}
      />

      <Typography component="h2" variant="h4" textTransform="capitalize" >
        {useResources("noItemsAvail")}
      </Typography>
    </div>
  );
};

export default EmptyItem;
