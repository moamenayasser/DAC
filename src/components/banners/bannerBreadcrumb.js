// Internal Imports
import Link from "next/link";
// MUI
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
// Components
import useResources from "@/hooks/useResources";

const BannerBreadcrumb = ({ crumbs }) => {
  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-ol": {
            justifyContent: "center",
          },
        }}
      >
        <Link
          color="secondary"
          href="/"
          underline="hover"
          style={{ textTransform: "capitalize" }}
        >
          {useResources("home")?.toLowerCase()}
        </Link>

        {crumbs?.map((item, index) => (
          <div key={index}>
            {index === crumbs.length - 1 ? (
              <Typography color="#fff" textTransform="capitalize">
                {item?.title?.toLowerCase()}
              </Typography>
            ) : (
              <Link
                color="secondary"
                href={item.href}
                underline="hover"
                style={{ textTransform: "capitalize" }}
              >
                {item?.title?.toLowerCase()}
              </Link>
            )}
          </div>
        ))}
      </Breadcrumbs>
    </div>
  );
};
export default BannerBreadcrumb;
