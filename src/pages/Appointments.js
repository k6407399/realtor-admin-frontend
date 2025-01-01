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
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

function Appointments() {
  const [view, setView] = useState("day"); // day, week, month
  const [appointments, setAppointments] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUrl = routesConfig.appointments?.fetch;

    if (!fetchUrl) {
      setError("Invalid route configuration for fetching appointments.");
      return;
    }

    axios
      .get(`${fetchUrl}?view=${view}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      })
      .then((response) => {
        setAppointments(response.data.appointments || []);
        setStatuses({}); // Reset statuses when view changes
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setError("Error fetching appointments.");
      });
  }, [view]);

  const handleStatusChange = (id, status) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const updateAppointmentStatus = (id) => {
    const status = statuses[id];
    if (!status) return;

    const updateUrl = routesConfig.appointments?.update?.replace(":id", id);

    if (!updateUrl) {
      setError("Invalid route configuration for updating appointment status.");
      return;
    }

    axios
      .put(
        updateUrl,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      )
      .then(() => {
        alert("Appointment status updated successfully");
        setAppointments((prev) =>
          prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
        );
        setError("");
      })
      .catch((error) => {
        console.error("Error updating appointment status:", error);
        setError("Error updating appointment status.");
      });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Manage Appointments
      </Typography>

      {/* View Filter */}
      <Box mb={2}>
        <TextField
          label="Filter By"
          select
          value={view}
          onChange={(e) => setView(e.target.value)}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="day">Today</MenuItem>
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
        </TextField>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error.main" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}

      {/* Appointments Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>{appt.id}</TableCell>
                <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(appt.date).toLocaleTimeString()}</TableCell>
                <TableCell>
                  {appt.user?.name || "Unknown User"} <br />
                  {appt.user?.mobileNumber || "N/A"}
                </TableCell>
                <TableCell>
                  <Select
                    value={statuses[appt.id] || appt.status}
                    onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="Confirmed">Confirmed</MenuItem>
                    <MenuItem value="Rescheduled">Rescheduled</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateAppointmentStatus(appt.id)}
                  >
                    Update
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

export default Appointments;
