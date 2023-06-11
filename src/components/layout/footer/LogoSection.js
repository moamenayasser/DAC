import Image from "next/image";
import Link from "@mui/material/Link";
import FooterBunaImg from "/public/images/w-logobuna.png";
import FooterTaamImg from "/public/images/w-logotam.png";
import FooterDacImg from "/public/images/logo-header.webp";
import useResources from "@/hooks/useResources";
import { Grid } from "@mui/material";

const LogoSection = () => {
  return (
    <>
    <Grid container  >
          <Grid item xs={12} justifyContent="center" display="flex" mb={3}>
          <Link
        href="https://buna-next-app.vercel.app/"
        underline="none"
        display="flex"
        target="_blank"
        rel="noopener"
      >
        <Image
          src={FooterBunaImg}
          alt="BUNA"
          width={160}
          height={60}
          style={{ maxWidth: "100%", height: "auto", objectFit:"contain" }}
        />
      </Link>
          </Grid>
          <Grid item xs={6}   p={0}  m={0}>
          <Link
        href="/"
        underline="none"
        display="flex"
        rel="noopener"
        justifyContent="flex-end"
      >
        <Image
          src={FooterDacImg}
          alt="DAC"
          width={120}
          height={55}
          style={{ maxWidth: "100%", height: "55px", objectFit:"contain" }}
        />
      </Link>
          </Grid>
          <Grid item xs={6} p={0}  m={0}>
          <Link
        href="http://taam.psdigitalme.com/"
        underline="none"
        display="flex"
        target="_blank"
        rel="noopener"
        justifyContent="start"

      >
        <Image
          src={FooterTaamImg}
          alt="TAAM"
          width={120}
          height={55}
          style={{ maxWidth: "100%", height: "55px", objectFit:"contain" }}
        />
      </Link>
          </Grid>
          </Grid>
   
    </>
  );
};

export default LogoSection;
