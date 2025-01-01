import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

const ListProperty = () => {
  const [propertyType, setPropertyType] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({ country: "India" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isFetchingFields, setIsFetchingFields] = useState(false);

  // Fetching the logged-in user's role
  const role = localStorage.getItem("role") || "user"; // Assuming role is stored in localStorage
  const userId = localStorage.getItem("userId"); // Assuming userId is also stored in localStorage

  useEffect(() => {
    if (propertyType) {
      setIsFetchingFields(true);

      const formFieldsUrl = routesConfig.formFields?.replace(":type", propertyType);

      axios
        .get(formFieldsUrl, {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        })
        .then((response) => {
          setFormFields(response.data.formFields || []);
          setFormData({
            country: "India",
            listedBy: role, // Set the role automatically
            userId, // Set the userId automatically
          });
          setSuccess(false);
          setError("");
        })
        .catch(() => setError("Error fetching form fields."))
        .finally(() => setIsFetchingFields(false));
    } else {
      setFormFields([]);
      setFormData({ country: "India" });
    }
  }, [propertyType, role, userId]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    if (field === "area" || field === "pricePerSqft") {
      setFormData((prevData) => ({
        ...prevData,
        totalPrice: (prevData.area || 0) * (prevData.pricePerSqft || 0),
      }));
    }
  };

  const handleSubmit = () => {
    if (!propertyType) {
      setError("Please select a property type.");
      return;
    }

    const createUrl = routesConfig[propertyType]?.create;

    if (!createUrl) {
      setError("Invalid route configuration for property creation.");
      return;
    }

    setLoading(true);

    axios
      .post(createUrl, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setPropertyType("");
        setFormFields([]);
        setFormData({ country: "India" });
        setError("");
      })
      .catch(() => {
        setLoading(false);
        setError("Error submitting property.");
      });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        List Property
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

      {isFetchingFields && (
        <Box textAlign="center" my={2}>
          <CircularProgress />
        </Box>
      )}

      {success && (
        <Typography color="success.main" style={{ marginTop: "10px" }}>
          Property listed successfully!
        </Typography>
      )}

      {error && (
        <Typography color="error.main" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}

      {formFields.length > 0 && (
        <Grid container spacing={2}>
          {formFields.map((field) => (
            <Grid item xs={12} sm={6} key={field.field}>
              {field.type === "checkbox" ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!formData[field.field]}
                      onChange={(e) => handleInputChange(field.field, e.target.checked)}
                    />
                  }
                  label={field.label}
                />
              ) : field.type === "file" ? (
                <Box>
                  <Typography>{field.label}</Typography>
                  <input
                    type="file"
                    accept={field.field === "photos" ? "image/*" : "video/*"}
                    multiple={field.max > 1}
                    onChange={(e) =>
                      handleInputChange(
                        field.field,
                        Array.from(e.target.files).map((file) => file.name)
                      )
                    }
                  />
                </Box>
              ) : (
                <TextField
                  label={field.label}
                  type={field.type}
                  value={formData[field.field] || ""}
                  onChange={(e) => handleInputChange(field.field, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              )}
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading || isFetchingFields}
        style={{ marginTop: "20px" }}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};

export default ListProperty;
