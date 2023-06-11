// MUI
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CustomSnackBar = (props) => {
  const {
    open,
    onClose,
    duration = 4000,
    origin = { vertical: "bottom", horizontal: "right" },
    type = "success",
    message,
  } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={origin}
      key={origin.vertical + origin.horizontal}
      sx={{bottom: "4rem !important"}}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
