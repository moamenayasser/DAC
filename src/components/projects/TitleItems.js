import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const TitleItems = ({ item }) => {
  //  // Get the (View Website) link
  //  const itemLinkPrima = item?.find(
  //   (el) => el.TypeName === "Link" && el.Prima && !el.Featured
  // );
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
      <Typography
        component="h2"
        variant="h2"
        textTransform="capitalize"
        mb={3}
        fontWeight="600"
      >
        {item?.ShortDescription}
      </Typography>
      <Button
        variant="standard"
        color="secondary"
        mt={8}
        mb={5}
        component={Link}
        href={item?.URL}
        target="_blank"
        
      >
        {item?.Name}
      </Button>
    </div>
  );
};

export default TitleItems;
