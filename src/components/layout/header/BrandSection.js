// Internal Imports
import Link from "next/link";
import Image from "next/image";
// Components
import useResources from "@/hooks/useResources";
// Images
import Logo from "/public/images/logo-header.webp";
// import LogoW from "/public/images/logo-header.webp";

const BrandSection = ({ trigger }) => {
  return (
    <div>
      <Link href="/" style={{ display: "flex" }}>
        <span style={{ display: trigger ? "none" : "flex" }}>
          <Image
            src={Logo}
            alt={useResources("DACLogo") || "DAC logo"}
            width={120}
            height={70}
            priority
            style={{objectFit:"contain"}}
          />
        </span>

        <span style={{ display: !trigger ? "none" : "flex" }}>
          <Image
            src={Logo}
            alt={useResources("DACLogo") || "DAC logo"}
            width={120}
            height={70}
            style={{objectFit:"contain"}}

          />
        </span>
      </Link>
    </div>
  );
};

export default BrandSection;
