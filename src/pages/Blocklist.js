import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

function Blocklist() {
  const [blocklist, setBlocklist] = useState([]);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  // Fetch blocklist
  useEffect(() => {
    axios
      .get(routesConfig.adminBlocklist)
      .then((response) => {
        setBlocklist(response.data.blocklist || []);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching blocklist:", error);
        setError("Error fetching blocklist. Please try again later.");
      });
  }, []);

  // Handle blocking a user
  const handleBlockUser = () => {
    if (!userId) {
      alert("Please enter a user ID to block.");
      return;
    }

    axios
      .put(`${routesConfig.adminUnblocklist.replace(":id", userId)}`, { isBlocked: true })
      .then(() => {
        alert("User blocked successfully");
        setBlocklist((prev) => [...prev, { id: parseInt(userId, 10), isBlocked: true }]);
        setUserId("");
        setError("");
      })
      .catch((error) => {
        console.error("Error blocking user:", error);
        setError("Error blocking user. Please try again later.");
      });
  };

  // Handle unblocking a user
  const handleUnblockUser = (id) => {
    axios
      .put(`${routesConfig.adminUnblocklist.replace(":id", id)}`, { isBlocked: false })
      .then(() => {
        alert("User unblocked successfully");
        setBlocklist((prev) => prev.filter((user) => user.id !== id));
        setError("");
      })
      .catch((error) => {
        console.error("Error unblocking user:", error);
        setError("Error unblocking user. Please try again later.");
      });
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "primary.main", marginBottom: "20px" }}
      >
        User Blocklist Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: "10px" }}>
          {error}
        </Alert>
      )}

      <Box mb={2} display="flex" alignItems="center">
        <TextField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="error"
          onClick={handleBlockUser}
          sx={{ marginLeft: 2 }}
        >
          Block User
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocklist.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUnblockUser(user.id)}
                  >
                    Unblock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Blocklist;
