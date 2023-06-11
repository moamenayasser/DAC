import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import NextImage from "@/components/NextImage";

const ClientCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  textAlign: "center",
  padding: "20px",
  display: "flex",
  transition: "all 0.3s ease-out 0s",
  border: "2px solid #f8f8f8",
  marginBottom: "40px",
  boxShadow: "unset",
  borderRadius: 0,
  "&:hover": {
    boxShadow: "0px 14px 24px 0px rgb(190 173 142 / 20%)",
  },
  "& .FormatQuoteIcon": {
    position: "absolute",
    right: 0,
    top: 0,
    color: "#c1c1c16b",
  },
  "& .FormatQuoteIcon svg": {
    fontSize: "137px"
  },
}));

const TestimonialsItem = ({ item }) => {
  return (
    <ClientCard sx={{ gap: 0, flexDirection: "column" , justifyContent: "flex-start" }}>
      <CardMedia
        style={{
          width: 150,
          height: 50,
          position: "relative",
          paddingLeft:16
        }}
      >
        <NextImage
          src={item?.Image}
          width={150}
          height={50}
          alt={item?.ImageAlt}
          placeholder="blur"
          style={{ objectFit: "contain" }}
        />
      </CardMedia>
      <CardContent
        style={{
          paddingTop: "10px",
          textAlign: "left",
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          mb={1}
          color="secondary.main"
          fontWeight={700}
        >
          {item?.Name}
        </Typography>
 
        <Typography variant="body1" component="p">
          {item?.Description}
        </Typography>
        <span className="FormatQuoteIcon">
          <FormatQuoteIcon />
        </span>

      </CardContent>
    </ClientCard>
  );
};

export default TestimonialsItem;
