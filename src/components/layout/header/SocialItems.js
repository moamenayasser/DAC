import { styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SnapChatIcon from "@/components/custom-icons/SnapChatIcon";
import YouTubeIcon from '@mui/icons-material/YouTube';

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  borderRadius: 0,
  backgroundColor: theme.palette.secondary.main,
  width: "35px",
  height: "35px",
  color: "#fff",
  fill: "#fff",
  border: `1px solid ${theme.palette.secondary.main}`,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#fff",
    color: theme.palette.secondary.main,
    fill: theme.palette.secondary.main,
  },
}));

const SocialItems = ({ socialIcons, ...other }) => {
  return (
    <>
      {socialIcons?.map((item) => (
        <IconButtonStyle
          key={item?.ID}
          aria-label={item?.Alt}
          href={item?.URL}
          target="_blank"
          rel="noopener"
          color="#fff"
          {...other}
        >
          {item?.Platform === 0 && <FacebookIcon />}
          {item?.Platform === 1 && <TwitterIcon />}
          {item?.Platform === 2 && <InstagramIcon />}
          {item?.Platform === 3 && <TelegramIcon />}
          {item?.Platform === 4 && <SnapChatIcon />}
          {item?.Platform === 5 && <LinkedInIcon />}
          {item?.Platform === 6 && <YouTubeIcon />}
        </IconButtonStyle>
      ))}
    </>
  );
};

export default SocialItems;
