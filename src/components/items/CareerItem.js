// Internal Imports
import Link from "next/link";
// MUI
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// Components
import NextImage from "../NextImage";
import useResources from "@/hooks/useResources";

const CareerCard = styled(Card)(({ theme }) => ({
  borderRadius: 0,
  height: "100%",
  border: "2px solid #f8f8f8",
  background: " #e5e4e4",
  boxShadow: "unset",
  display: "flex",
  flexDirection: "column",
  "& .card-img img": {
    transition: "all 0.3s ease-out 0s",
  },
  "& .title": {
    background: "#000",
    padding: "20px",
    color: "#fff"

  },

  "& .view-link": {
    "color": "#000",
    "justifyContent": "center",
    "position": "relative",
    "border": "2px solid #000",
    "transition": "all 0.4s cubic-bezier(0.42, 0, 0.58, 1)",
    "height": "50px",
    "lineHeight": "50px",
    "padding": "0 40px",
    "zIndex": "1"
  },

  "& .view-link:after": { "height": "100%", color: "#fff", "zIndex": "-1" },
  "& .view-link:before": {
    "display": "block",
    "position": "absolute",
    "top": "0",
    "right": "0",
    "height": "100%",
    "width": "0",
    "content": "\"\"",
    "color": "#fff !important",
    "background": "#000",
    "transition": "all 0.4s cubic-bezier(0.42, 0, 0.58, 1)",
    "zIndex": "-1"

  },
  "& .view-link:hover": {
    "color": "#fff !important",
  },
  "&:hover": {
    boxShadow: "0px 14px 24px 0px #d7282b17",
    "& .card-img img": {
      transform: "scale(1.1)",
    },


  },
  "& ul": {
    backgroundColor: "#fff",
    padding: 15,
    position: "absolute",
    left: 25,
    right: 25,
    top: 0,
    display: "flex",
    justifyContent: "center",
    transform: "translateY(-50%)",
    boxShadow: "0px 8px 16px 0px rgb(138 138 138 / 4%)",

    "& li": {
      textAlign: "center",
      justifyContent: "center",
    },
  },
  "@media (max-width: 768px)": {
    "& img": {
      width: "100%",
      objectFit: "cover",
    },
  },
}));

const CareerItem = ({ item }) => {
  return (
    <CareerCard>
      <Link href={`/careers/${item.UniqueCode}`}>
        <CardMedia
          sx={{ height: "240px", overflow: "hidden" }}
          className="card-img"
        >
          <NextImage
            src={item.ImageUrl}
            width={400}
            height={240}
            alt={item.Alt}
            placeholder="blur"
          />
        </CardMedia>
      </Link>

      <CardContent
        style={{
          padding: "0",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Link href={`/careers/${item.UniqueCode}`}>
          <Typography
            variant="h5"
            component="h2"
            className="title"
            truncate={1}
            textTransform="capitalize"
          >
            {item?.Title?.toLowerCase()}
          </Typography>
        </Link>
        <Box display="flex" flexWrap="wrap" p={2} >
          <Typography variant="body1" component="p" truncate={3} mb="15px">
            {item.DescriptionShort}
          </Typography>

          <Link href={`/careers/${item.UniqueCode}`} className="view-link">
            {useResources("aplayNow")}
          </Link>
        </Box>
      </CardContent>
    </CareerCard>
  );
};

export default CareerItem;
