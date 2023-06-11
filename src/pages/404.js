import Link from "next/link";
import Image from "next/image";
import Error from "/public/images/error.svg";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useResources from "@/hooks/useResources";

const Custom404 = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      pt={23}
      pb={10}
    >
      <div style={{ textAlign: "center" }}>
        <Image
          src={Error.src}
          alt="Error"
          width={200}
          height={200}
          style={{ display: "block", margin: "auto" }}
        />

        <Typography
          component="h1"
          variant="h1"
          mt={2}
          mb={5}
          textTransform="capitalize"
        >
          {useResources("pageNotFound")}
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          mt={10}
          component={Link}
          href="/"
        >
          {useResources("backToHome")}
        </Button>
      </div>
    </Box>
  );
};

export default Custom404;

Custom404.customHeaderProps = () => ({
  color: "primary",
  position: "fixed",
  elevation: 1,
  style: {
    color: "#000",
  },
});

Custom404.customTrigger = true;

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      locale,
    },
  };
};
