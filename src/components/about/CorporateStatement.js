import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import Image from "next/image";
const TeamSocial = styled("div")({
  display: "flex",
  "& a": {
    width: "40px",
    height: "40px",
    background: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    marginRight: "5px",
    color: "#fff",
    border: "2px solid #000",
    transition: "0.3s ease-in",
    webkitTransition: "0.3s ease-in",
    mozTransition: "0.3s ease-in",
    msTransition: "0.3s ease-in",
    oTransition: "0.3s ease-in",
    "&:hover": {
      background: "transparent",
      color: "#000",
    },
  },
});

const CorporateStatement = ({ locale, teams }) => {
  console.log(teams);
  return (
    <div
      style={{
        paddingTop: 80,
        paddingBottom: 80,
        overflow: "hidden",
        background: "#f6f6f6",
      }}
    >
      <Container>
        <Grid container display="flex" alignItems="center" spacing={3}>
          {teams?.map((team) => (
            <Grid
              key={team.ID}
              item
              xs={12}
              md={6}
              position="relative"
              display="flex"
              flexWrap="wrap"
              alignItems="baseline"
              justifyContent="center"
              gap={4}
              data-aos="fade-left"
            >
              <div>
                <Image
                  src={team.FeatureImageUrl}
                  alt={team.Name}
                  width={115}
                  height={115}
                  style={{
                    objectFit: "cover",
                    width: "115px",
                    height: "115px",
                    borderRadius: "50%",
                    marginBottom: "15px",
                    marginRight: "15px",
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  marginTop="10px"
                  fontSize={16}
                  fontWeight={700}
                  textAlign="left"
                >
                  {team.Name}
                </Typography>
                <Typography
                  variant="h6"
                  component="h4"
                  textAlign="left"
                  color="secondary.main"
                  style={{
                    fontSize: "16px",
                    color: " #777",
                  }}
                >
                  {team.DescriptionShort}
                </Typography>
                <div
                  dangerouslySetInnerHTML={{ __html: team?.DescriptionLong }}
                />
                <TeamSocial>
                  <Link href={`${team?.Link1}`}>
                    <LinkedInIcon />
                  </Link>
                  <Link href={`mailto:${team?.Link2}`}>
                    <MailIcon />
                  </Link>
                </TeamSocial>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default CorporateStatement;
