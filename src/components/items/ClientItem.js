import { styled } from "@mui/material/styles";
import NextImage from "../NextImage";

const ClientItemStyle = styled("div")({
  height: 130,
  margin: "auto",
  padding: "20px 10px",
  border: "2px solid rgb(248, 248, 248)",
  transition: "all 0.3s ease-out 0s",
  "&:hover": {
    boxShadow: "rgba(190, 173, 142, 0.2) 0px 14px 24px 0px",
  },
});

const ClientItem = ({ item }) => {
  return (
    <ClientItemStyle>
      <NextImage
        src={item.ImageUrl}
        alt={item.Name}
        width={200}
        height={100}
        placeholder="blur"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </ClientItemStyle>
  );
};

export default ClientItem;
