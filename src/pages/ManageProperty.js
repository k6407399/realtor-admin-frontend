import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
} from "@mui/material";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

function ManageProperty() {
  const [propertyType, setPropertyType] = useState("");
  const [properties, setProperties] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (propertyType) {
      const fetchUrl = routesConfig[propertyType]?.fetch;

      if (!fetchUrl) {
        setError("Invalid route configuration for property fetching.");
        return;
      }

      axios
        .get(fetchUrl)
        .then((response) => {
          const dataKey = {
            land: "lands",
            flats: "flats",
            villas: "villas",
            apartments: "apartments",
          }[propertyType];

          setProperties(response.data[dataKey] || []);
          setStatuses({}); // Reset statuses when propertyType changes
          setError("");
        })
        .catch((error) => {
          console.error("Error fetching properties:", error);
          setError("Error fetching properties.");
        });
    } else {
      setProperties([]);
      setStatuses({}); // Reset statuses when no propertyType is selected
    }
  }, [propertyType]);

  const handleStatusChange = (id, status) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const updatePropertyStatus = (id) => {
    const status = statuses[id];
    if (!status) return;

    const updateUrl = routesConfig[propertyType]?.update?.replace(":id", id);

    if (!updateUrl) {
      setError("Invalid route configuration for property status update.");
      return;
    }

    axios
      .put(updateUrl, { status })
      .then(() => {
        alert("Property status updated successfully");
        setProperties((prev) =>
          prev.map((prop) => (prop.id === id ? { ...prop, status } : prop))
        );
        setError("");
      })
      .catch((error) => {
        console.error("Error updating property status:", error);
        setError("Error updating property status.");
      });
  };

  const renderDetails = (property) => {
    const selectedFields = ["propertyId", "location", "area", "pricePerSqft", "totalPrice", "city"];
    return selectedFields.map((field) => (
      <Typography key={field} variant="body2">
        <strong>{field}:</strong> {property[field] || "N/A"}
      </Typography>
    ));
  };  

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Manage Property
      </Typography>

      <TextField
        label="Property Type"
        select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="land">Land</MenuItem>
        <MenuItem value="flats">Flats</MenuItem>
        <MenuItem value="villas">Villas</MenuItem>
        <MenuItem value="apartments">Apartments</MenuItem>
      </TextField>

      {error && (
        <Typography color="error.main" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>{property.id}</TableCell>
                <TableCell>{propertyType}</TableCell>
                <TableCell>{renderDetails(property)}</TableCell>
                <TableCell>
                  <Select
                    value={statuses[property.id] || property.status}
                    onChange={(e) => handleStatusChange(property.id, e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Sold Out">Sold Out</MenuItem>
                    <MenuItem value="Deal Inprogress">Deal Inprogress</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updatePropertyStatus(property.id)}
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

export default ManageProperty;
