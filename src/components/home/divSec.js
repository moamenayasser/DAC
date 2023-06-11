import { Container, Grid, Typography, styled } from "@mui/material";
import Link from "next/link";
import NextImage from "../NextImage";
import useResources from "@/hooks/useResources";

const DivBox = styled("div")(({ theme }) => ({
  paddingTop: 8,
  paddingBottom: 12,
  backgroundColor: "#000",
  "& .inner-box": {
    padding: "0px 5px 43px",
    margin: "25px 5px 35px",
    position: "relative",
    maxHeight: "120px",
    height: "88px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    transition: "all 0.2s ease-in-out",
    justifyContent: "center",
    border: "1px solid #4e4d4d",
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(10),
  },
  "& .MuiGrid-container": {
    [theme.breakpoints.down("md")]: {
      paddingTop:"30px"
      // flexDirection: "column-reverse",
    },
  },
  "& img": {
    position: "relative",
    transition: "all 0.2s linear",
    objectFit: "contain",
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "1px -1px 12px 7px #eeeeee57",
    },
  },
}));
const DivSec = ({ data }) => {
  return (
    <>
      <DivBox>
        <Container fixed>
          <Grid
            container
            spacing={{ xs: 0, md: 4 }}
            display="flex"
            alignItems="center"
          >
            <Grid
              item
              sm={12}
              md={8}
              position="relative"
              width="100%"
              className="img-border"
            >
              <Typography
                variant="h2"
                component="h2"
                marginBottom="20px"
                color="#fff"
              >
                {useResources("divisions")}
              </Typography>
              <Typography
                variant="p"
                component="p"
                marginBottom="20px"
                color="#fff"
              >
                {useResources("divisionsDesc")}
              </Typography>
            </Grid>
            {data?.map((item, index) => (
              <Grid item sm={6} md={2} position="relative" key={index}>
                {/* <Link href="#"> */}
                <Link
                  className="inner-box"
                  href={`/divisions?active=${item.UniqueName}`}
                >
                  <div>
                    <NextImage
                      src={item?.ImageUrl}
                      alt={item?.Name}
                      width={450}
                      height={600}
                      placeholder="blur"
                    />

                    <Typography
                      variant="h6"
                      component="h6"
                      color="#fff"
                      style={{
                        fontSize: "15px",
                        textTransform: "uppercase",
                        marginTop: "5px",
                      }}
                    >
                      {item?.Name}
                    </Typography>
                  </div>
                </Link>
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </DivBox>
    </>
  );
};

export default DivSec;
