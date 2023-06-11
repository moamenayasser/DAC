// Internal Imports
import Link from "next/link";
// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const InfoSection = ({ data }) => {
  return (
    <>
      <div style={{ paddingLeft: "30px",paddingTop:"20px" }}>
        <div className="section-title">
          <Typography
            variant="h2"
            component="h2"
            marginBottom="20px"
            color="primary"
          >
           {data?.Title}
          </Typography>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: data?.LongDescription }}
          style={{ marginBottom: 48 }}
        />

        {data?.Link1Name && (
          <Button
            variant="contained"
            color="secondary"
            mt={8}
            mb={5}
            component={Link}
            href={data?.Link1}
          >
            {data?.Link1Name}
          </Button>
        )}
      </div>
    </>
  );
};

export default InfoSection;
