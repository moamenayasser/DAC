import Link from "next/link";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import useResources from "@/hooks/useResources";

const InnerPrevNext = (props) => {
  const { previous, next, all, locale, prevLabel, nextLabel } = props;

  return (
    <Stack
      mt={10}
      mb={5}
      sx={{
        "&": {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        "& a:hover": { color: "#777" },
        "& a:hover >svg": { padding: "3px" },
      }}
    >
      {previous ? (
        <MuiLink href={previous} underline="none" style={{ display: "flex" }}>
          <ArrowBackIosNewOutlinedIcon
            style={{
              transform: locale === "en" ? "rotate(0)" : "rotate(180deg)",
            }}
          />{" "}
          <span>{useResources(prevLabel)}</span>
        </MuiLink>
      ) : (
        <div
          style={{
            display: "flex",
            cursor: "not-allowed",
            color: "#0202028c",
          }}
        >
          <ArrowBackIosNewOutlinedIcon
            style={{
              transform: locale === "en" ? "rotate(0)" : "rotate(180deg)",
            }}
          />{" "}
          <span>{useResources(prevLabel)}</span>
        </div>
      )}

      <Link href={all}>
        <AppsIcon
          fontSize="large"
          sx={{ "&:hover": { color: "secondary.main" } }}
        />
      </Link>

      {next ? (
        <MuiLink href={next} underline="none" style={{ display: "flex" }}>
          <span>{useResources(nextLabel)}</span>
          <ArrowForwardIosOutlinedIcon
            style={{
              transform: locale === "en" ? "rotate(0)" : "rotate(180deg)",
            }}
          />
        </MuiLink>
      ) : (
        <div
          style={{
            display: "flex",
            cursor: "not-allowed",
            color: "#0202028c",
          }}
        >
          <span>{useResources(nextLabel)}</span>{" "}
          <ArrowForwardIosOutlinedIcon
            style={{
              transform: locale === "en" ? "rotate(0)" : "rotate(180deg)",
            }}
          />
        </div>
      )}
    </Stack>
  );
};

export default InnerPrevNext;
