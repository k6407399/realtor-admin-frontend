import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <Box display="flex" minHeight="97vh" bgcolor="grey.100">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
