import Zoom from "@mui/material/Zoom";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <Zoom
      in={value === index}
      timeout={{ appear: 800, enter: 800, exit: 800 }}
      unmountOnExit
    >
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
      >
        <div style={{ paddingTop: 24, paddingBottom: 24 }}>{children}</div>
      </div>
    </Zoom>
  );
};

export default TabPanel;
