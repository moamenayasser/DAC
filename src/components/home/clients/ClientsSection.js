// Components
import ClientsHeading from "./ClientsHeading";
import ClientsSlider from "./ClientsSlider";
import ViewAllBtn from "../../viewAllBtn";
import useResources from "@/hooks/useResources";

const ClientsSection = ({ data, locale }) => {
  return (
    <div
      style={{
    
        paddingTop: 56,
        paddingBottom: 80,
      }}
    >
      <ClientsHeading />

      <ClientsSlider data={data?.slice(0, 8)} locale={locale} />

      <div style={{ display: "flex", textAlign: "center", marginTop: 64 }}>
        <ViewAllBtn
          name={useResources("viewAllClients")}
          variant="standard"
          link="/clients"
        />
      </div>
    </div>
  );
};

export default ClientsSection;
