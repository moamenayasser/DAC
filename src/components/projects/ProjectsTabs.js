import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useResources from "@/hooks/useResources";

const a11yProps = (index) => ({
  id: `vertical-tab-${index}`,
  "aria-controls": `vertical-tabpanel-${index}`,
});

const TabsStyle = styled(Tabs)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  "& .MuiTabScrollButton-root": {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    display: "inline-flex !important",
    "& .MuiSvgIcon-root": {
      fontSize: 24,
    },
    "&.Mui-disabled": {
      opacity: "0.5",
    },
  },
  "& .MuiTabs-flexContainer": {
    "& .MuiTab-root": {
      textTransform: "capitalize",
      borderRight: "1px solid #e8e8e8",
      borderLeft: "1px solid #e8e8e8",
      color: "#fff",
      backgroundColor: "#000",
      textAlign: "center",
      justifyContent: "center",
      flexGrow: 1,
      transition: "0.3s ease-in-out",
      "&:hover": {
        backgroundColor: "#f5f5f5",
        color: "#000",
      },
      "&.Mui-selected": {
        backgroundColor: "#f5f5f5",
        color: "#000",
      },
    },
  },
}));


const ProjectsTabs = (props) => {
  const { data, value, handleChange } = props;

  return (
    <TabsStyle
      variant="scrollable"
      scrollButtons="auto"
      value={value}
      onChange={handleChange}
      aria-label="DAC"
    >
      {data?.map((item, index) => (
        <Tab
          key={index}
          label={index === 0 ? useResources(item?.Name) : item?.Name}
          {...a11yProps({ index })}
        />
      ))}
    </TabsStyle>
  );
};

export default ProjectsTabs;
