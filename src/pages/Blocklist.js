import React, { useState, useEffect } from 'react';
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
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import axios from '../api/axios';
import routesConfig from '../config/routesConfig';

const Blocklist = () => {
  const [blocklist, setBlocklist] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');

  // Fetch blocklist and all users
  useEffect(() => {
    const fetchUsersAndBlocklist = async () => {
      try {
        const [blocklistResponse, usersResponse] = await Promise.all([
          axios.get(routesConfig.adminBlocklist),
          axios.get(routesConfig.users), // This should resolve to http://localhost:5000/api/v1/users
        ]);
        setBlocklist(blocklistResponse.data.blocklist || []);
        setUsers(usersResponse.data.users || []);
        setError('');
      } catch (err) {
        console.error('Error fetching users or blocklist:', err);
        setError('Error fetching users. Please try again later.');
      }
    };    

    fetchUsersAndBlocklist();
  }, []);

  // Handle blocking a user
  const handleBlockUser = async () => {
    if (!selectedUserId) {
      alert('Please select a user ID to block.');
      return;
    }

    try {
      await axios.put(
        routesConfig.adminUnblocklist.replace(':id', selectedUserId),
        { isBlocked: true }
      );
      const user = users.find((u) => u.id === selectedUserId);
      setBlocklist((prev) => [...prev, { id: user.id, name: user.name, mobileNumber: user.mobileNumber }]);
      setSelectedUserId('');
      alert('User blocked successfully.');
    } catch (err) {
      console.error('Error blocking user:', err);
      setError('Error blocking user. Please try again later.');
    }
  };

  // Handle unblocking a user
  const handleUnblockUser = async (id) => {
    try {
      await axios.put(routesConfig.adminUnblocklist.replace(':id', id), { isBlocked: false });
      setBlocklist((prev) => prev.filter((user) => user.id !== id));
      alert('User unblocked successfully.');
    } catch (err) {
      console.error('Error unblocking user:', err);
      setError('Error unblocking user. Please try again later.');
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', color: 'primary.main', marginBottom: '20px' }}
      >
        User Blocklist Management
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box display="flex" alignItems="center" mb={2}>
        <Select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a User to Block
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.id} - {user.name} ({user.mobileNumber})
            </MenuItem>
          ))}
        </Select>
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
              <TableCell>Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocklist.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
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
};

export default Blocklist;


/* import React, { useState, useEffect } from "react";
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
  MenuItem,
} from "@mui/material";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

function Blocklist() {
  const [blocklist, setBlocklist] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(routesConfig.adminBlocklist)
      .then((response) => {
        setBlocklist(response.data.blocklist || []);
      })
      .catch((error) => {
        console.error("Error fetching blocklist:", error);
        setError("Error fetching blocklist. Please try again later.");
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users`)
      .then((response) => {
        setUsers(response.data.users || []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later.");
      });
  }, []);

  const handleBlockUser = () => {
    if (!selectedUserId) {
      alert("Please select a user to block.");
      return;
    }

    axios
      .put(routesConfig.adminUnblocklist.replace(":id", selectedUserId), { isBlocked: true })
      .then(() => {
        const user = users.find((u) => u.id === selectedUserId);
        alert("User blocked successfully");
        setBlocklist((prev) => [...prev, { ...user, isBlocked: true }]);
        setSelectedUserId("");
        setError("");
      })
      .catch((error) => {
        console.error("Error blocking user:", error);
        setError("Error blocking user. Please try again later.");
      });
  };

  const handleUnblockUser = (id) => {
    axios
      .put(routesConfig.adminUnblocklist.replace(":id", id), { isBlocked: false })
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
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "primary.main" }}>
        User Blocklist Management
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box mb={2} display="flex" alignItems="center">
        <TextField
          label="Select User"
          select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          fullWidth
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.id} - {user.name} ({user.mobileNumber})
            </MenuItem>
          ))}
        </TextField>
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
              <TableCell>Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocklist.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
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
 */