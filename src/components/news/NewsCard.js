import Link from "next/link";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import NextImage from "@/components/NextImage";
import useResources from "@/hooks/useResources";
import LaunchIcon from '@mui/icons-material/Launch';

const CardBox = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
  height: "100%",
  "& .card-img img": {
    "display": "block",
    "width": "100%",
    "webkitFilter": "grayscale(0)",
    "msFilter": "grayscale(0)",
    "mozFilter": "grayscale(0)",
    "filter": "grayscale(0)",
    "webkitTransition": "all 0.5s ease",
    "mozTransition": "all 0.5s ease",
    "msTransition": "all 0.5s ease",
    "oTransition": "all 0.5s ease",
    "transition": "all 0.5s ease",
    "objectFit": "cover"
  },
  "&:hover": {
    "& .card-img img": { 
      "webkitFilter": "grayscale(100%)",
      "msFilter": "grayscale(100%)",
      "mozFilter": "grayscale(100%)",
      "filter": "grayscale(100%)"
    },
    "& .title": { color: theme.palette.secondary.main },
  },
  "& .DateNews":{
    "position": "relative",
    "padding": "14px 10px",
    "background": "#e9e9e9",
    "textAlign": "center",
    "top": "-30px",
    "marginBottom": "0",
    "boxShadow": "0 10px 30px 0 rgba(0, 0, 0, 0.05)"
  
  },
  "& .Ex-link":{
    "width": "50px",
    "height": "50px",
    "textAlign": "center",
    "color": "#fff",
    "background": "#000",
    "borderRadius": "50%",
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center"
  },
}));

const NewsCard = ({ data, locale }) => {
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString([locale === "en" ? "en-us" : "ar-eg"], {
      month: "short",
    });
  }

  const specifiedDate = new Date(data.Date);

  const finalDate = `${specifiedDate.getDate()},  ${getMonthName(
    specifiedDate.getMonth()
  )}, ${specifiedDate.getFullYear()}`;

  return (
    <CardBox sx={{ borderRadius: 0, boxShadow: "unset" }}>
      <CardMedia
        sx={{ height: "240px", overflow: "hidden" }}
        className="card-img"
      >
        <Link href={`/news/${data.UniqueName}`}>
          <NextImage
            src={data.ImageUrl}
            width={400}
            height={240}
            alt={data.Name}
          />
        </Link>
      </CardMedia>

      <CardContent
        style={{
          padding: 20,
          position: "relative",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          className="DateNews"
        >
          <Typography display="flex" alignItems="center" fontSize={12} >
            <CalendarMonthOutlinedIcon fontSize="small" color="secondary" />
            {finalDate}
          </Typography>
          <Typography display="flex" alignItems="center" fontSize={12}>
            <PermIdentityOutlinedIcon fontSize="small" color="secondary" />{" "}
            {useResources("byAuthor")} {data.Auther1}
          </Typography>
        </Box>

        <Link href={`/news/${data.UniqueName}`}>
          <Typography
            variant="h4"
            component="h2"
            mb={2}
            truncate={2}
            minHeight={60}
            className="title"
            textTransform="capitalize"
          >
            {data?.Name?.toLowerCase()}
          </Typography>
        </Link>
        <Typography variant="body1" component="p" truncate={3} mb={2}>
          {data.DescriptionShort}
        </Typography>

        <Box mt="auto" display="flex" justifyContent="flex-end">
          <Link href={`/news/${data.UniqueName}`} className="Ex-link">
          <LaunchIcon />
          </Link>
        </Box>
      </CardContent>
    </CardBox>
  );
};
export default NewsCard;
