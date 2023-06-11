// Internal Imports
import Link from "next/link";
// MUI
import Button from "@mui/material/Button";

const ViewAllBtn = ({ name, variant, link }) => {
  return (
    <Button
      variant={variant}
      component={Link}
      href={link}
      style={{ width: "fit-content", margin: "auto" }}
    >
      {name}
    </Button>
  );
};
export default ViewAllBtn;
