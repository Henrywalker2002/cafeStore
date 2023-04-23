import * as React from "react";
import PurTable from "./List/PurTable";
import Header from "../../Components/Header/Header";
import Title from "../../Components/Title/Title";

import { FaShoppingCart } from "react-icons/fa";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function Purchase() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Header />
      <Title
        title="Your Purchase"
        icon={<FaShoppingCart className="title-icon" />}
      />
      {/* <StateNav /> */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All Orders" value="1" className="state-tab" />
              <Tab label="Processing" value="2" className="state-tab" />
              <Tab label="Shipping" value="3" className="state-tab" />
              <Tab label="Success" value="4" className="state-tab" />
              <Tab label="Cancelation" value="5" className="state-tab" />
              <Tab label="Rated" value="6" className="state-tab" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <PurTable state="all" />
          </TabPanel>
          <TabPanel value="2">
            <PurTable state="Processing" />
          </TabPanel>
          <TabPanel value="3">
            <PurTable state="Shipping" />
          </TabPanel>
          <TabPanel value="4">
            <PurTable state="Success" />
          </TabPanel>
          <TabPanel value="5">
            <PurTable state="Cancelation" />
          </TabPanel>
          <TabPanel value="6">
            <PurTable state="Rated" />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Purchase;
