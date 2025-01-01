import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Button, Divider, Typography } from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Box
      width="250px"
      bgcolor="grey.200"
      display="flex"
      flexDirection="column"
      height="97vh"
      position="sticky"
      top={0}
    >
      {/* Admin Dashboard Heading */}
      <Box p={2} borderBottom="1px solid #ccc">
        <Typography
          variant="h6"
          align="center"
          style={{ color: "#1976d2", fontWeight: "bold" }} // Apply blue color and bold font
        >
          Admin Dashboard
        </Typography>
      </Box>
      {/* Navigation Menu */}
      <Box flexGrow={1} overflow="auto">
        <List>
          <ListItem button component={Link} to="/dashboard/list-property">
            <ListItemText primary="List Property" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/dashboard/manage-property">
            <ListItemText primary="Manage Property" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/dashboard/appointments">
            <ListItemText primary="Appointments" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/dashboard/approvals">
            <ListItemText primary="Approvals" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/dashboard/blocklist">
            <ListItemText primary="Blocklist" />
          </ListItem>
        </List>
      </Box>
      {/* Logout Button */}
      <Box p={2} borderTop="1px solid #ccc">
        <Button variant="contained" color="error" fullWidth onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
