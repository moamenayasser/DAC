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

const CardBox = styled(Card)({
  borderRadius: 0,
  height: "100%",
  "& .card-img img": {
    display: "block",
    width: "100%",
    webkitFilter: "grayscale(0)",
    msFilter: "grayscale(0)",
    mozFilter: "grayscale(0)",
    filter: "grayscale(0)",
    webkitTransition: "all 0.5s ease",
    mozTransition: "all 0.5s ease",
    msTransition: "all 0.5s ease",
    oTransition: "all 0.5s ease",
    transition: "all 0.5s ease",
    objectFit: "cover",
  },
  "&:hover": {
    "& .card-img img": {
      webkitFilter: "grayscale(100%)",
      msFilter: "grayscale(100%)",
      mozFilter: "grayscale(100%)",
      filter: "grayscale(100%)",
    },
  },
});

const BlogCard = ({ data, locale }) => {
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
      <Link href={`/blogs/${data.UniqueName}`}>
        <CardMedia
          sx={{ height: "240px", overflow: "hidden" }}
          className="card-img"
        >
          <NextImage
            src={data.ImageUrl}
            width={400}
            height={240}
            alt={data.Name}
          />
        </CardMedia>
      </Link>

      <CardContent>
        <Link href={`/blogs/${data.UniqueName}`}>
          <Typography
            variant="h4"
            component="h2"
            className="title"
            truncate={2}
            textTransform="capitalize"
            sx={{ padding: "20px 0" }}
          >
            {data?.Name?.toLowerCase()}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              display="flex"
              alignItems="center"
              fontSize="13px"
              gap={1}
            >
              <CalendarMonthOutlinedIcon color="secondary" fontSize="small" />
              {finalDate}
            </Typography>
            {/* <Typography
              display="flex"
              alignItems="center"
              fontSize="14px"
              gap={1}
            >
              <PermIdentityOutlinedIcon color="secondary" fontSize="small" />{" "}
              {useResources("byAuthor")} {data.Auther1}
            </Typography> */}
          </Box>
        </Link>
        <Typography variant="body1" component="p">
          {data?.DescriptionShort}
        </Typography>

        <Box mt={3} gap={2} display="flex">
          <Link className="view-link" href={`/blogs/${data.UniqueName}`}>
            {data?.Source1}
          </Link>
        </Box>
      </CardContent>
    </CardBox>
  );
};
export default BlogCard;
