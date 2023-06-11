// MUI
import { styled } from "@mui/material/styles";

const LoadingBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: "100%",
  height: "100%",
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9999,

  "& .cssload-container": {
    display: "block",
    width: "97px",

    "& .cssload-loading i": {
      width: "19px",
      height: "19px",
      display: "inline-block",
      borderRadius: "50%",
      background: "#fff",

      "&:first-of-type": {
        opacity: "0",
        animation: "cssload-loading-ani2 0.58s linear infinite",
        transform: "translate(-19px)",
      },

      "&:nth-of-type(2), &:nth-of-type(3)": {
        animation: "cssload-loading-ani3 0.58s linear infinite",
      },

      "&:last-of-type": {
        animation: "cssload-loading-ani1 0.58s linear infinite",
      },
    },
  },
}));

const Loader = () => {
  return (
    <LoadingBox>
      <div className="cssload-container">
        <div className="cssload-loading">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
    </LoadingBox>
  );
};

export default Loader;
