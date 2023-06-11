import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material";

const AccordionStyle = styled(Accordion)({
  marginBottom: "20px",
  color: "#fff",
  backgroundColor:"#000",
     boxShadow: "rgb(191 191 191 / 15%) 0px 14px 24px 0px",
 
  "&.Mui-expanded:first-of-type": {
    marginTop: "unset",
  },
  "&:before": {
    display: "none",
  },
  "& .Mui-expanded": {
    color: "#fff",
    minHeight: "unset !important",
    backgroundColor:"#000",
    "& .MuiAccordionSummary-content": {
      margin: "12px 0",
    }
  },
  
  "& .MuiCollapse-root": {
    borderTop: "2px solid #eee",
    backgroundColor:"#fff",
    color:"#000",
  },
  "& h4": {
    transition: ".3s",
  },
  "& h4:hover": {
    color: "#fff",
   
  },
  "& svg": {
    fill: "#fff",
   
  },
});

export default function SimpleAccordion({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <AccordionStyle key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={index}
          >
            <Typography variant="h6" component="h4">
              {item.Question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" component="p">
              {item.Answer}
            </Typography>
          </AccordionDetails>
        </AccordionStyle>
      ))}
    </div>
  );
}
