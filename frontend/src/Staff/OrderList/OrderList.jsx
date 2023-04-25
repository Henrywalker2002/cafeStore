import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Table from "./List/Table/Table";
import Header from "../../Components/Header/Header";
import Title from "../../Components/Title/Title";
import { FaClipboardList } from "react-icons/fa";

function OrderList() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Header />
      <Title
        title="Order List"
        icon={<FaClipboardList className="title-icon" />}
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
            </TabList>
          </Box>
          <TabPanel value="1">
            <Table state="all" />
          </TabPanel>
          <TabPanel value="2">
            <Table state="Processing" />
          </TabPanel>
          <TabPanel value="3">
            <Table state="Shipping" />
          </TabPanel>
          <TabPanel value="4">
            <Table state="Success" />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default OrderList;
