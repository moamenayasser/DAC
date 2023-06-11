import Typography from "@mui/material/Typography";


const WhoWeAreInfo = (props) => {
  const { data, locale } = props;


  return (
    <>
      <div style={{paddingLeft:"50px"}}>
        <div className="section-title">
          <Typography variant="h2" component="h2" marginBottom="20px">
            {data?.Name}
          </Typography>
        </div>

        <div
          style={{ marginBottom: 48 }}
          dangerouslySetInnerHTML={{ __html: data?.DescriptionLong }}
        />
      </div>
    </>
  );
};

export default WhoWeAreInfo;
