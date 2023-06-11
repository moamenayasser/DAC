// Internal Imports
import Link from "next/link";
// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NextImage from "@/components/NextImage";

const InfoSection = ({ data, content }) => {
  return (
    <>
      <div style={{ paddingLeft: "30px", paddingTop: "20px" }}>
        <div className="section-title">
          <Typography
            variant="h2"
            component="h2"
            marginBottom="20px"
            color="primary"
          >
            {data[0]?.DescriptionShort}
          </Typography>
        </div>
        {content.map((item, index) => (
          <div key={index}>
            <Typography
              variant="h5"
              component="h5"
              marginBottom="5px"
              color="primary"
              fontFamily="acumin_en_font"
            >
              {item.Name}
            </Typography>

            <Typography
              variant="p"
              component="p"
              marginBottom="20px"
              color="primary"
            >
              {item.DescriptionLong}
            </Typography>
            <NextImage
              src={item?.ImageUrl}
              alt={item?.Name}
              width={130}
              height={50}
              placeholder="blur"
              style={{
                objectFit: "contain",
                objectPosition: "left",
                marginBottom: "30px",
              }}
            />
          </div>
        ))}
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
