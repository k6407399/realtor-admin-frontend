import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

function Approvals() {
  const [pendingApprovals, setPendingApprovals] = useState({});
  const [error, setError] = useState(null);
  const [openSection, setOpenSection] = useState("lands"); // Default open section

  useEffect(() => {
    axios
      .get(routesConfig.approvals.fetch)
      .then((response) => {
        setPendingApprovals(response.data.pendingApprovals || {});
      })
      .catch((err) => {
        console.error("Error fetching approvals:", err);
        setError("Error fetching approvals. Please try again later.");
      });
  }, []);

  const handleApproval = (id, type, status) => {
    const approvalUrl = routesConfig.approvals.update
      .replace(":type", type.slice(0, -1)) // Convert plural to singular
      .replace(":id", id);
  
    const payload = { approvalStatus: status };
    if (status === "Rejected") {
      const reason = prompt("Please provide a reason for rejection:");
      if (!reason) {
        alert("Reason is required for rejection.");
        return;
      }
      payload.reason = reason;
    }
  
    axios
      .put(approvalUrl, payload)
      .then(() => {
        alert(`Property ${status.toLowerCase()} successfully`);
        setPendingApprovals((prev) => {
          const updatedApprovals = { ...prev };
          updatedApprovals[type] = updatedApprovals[type].filter(
            (property) => property.id !== id
          );
          return updatedApprovals;
        });
      })
      .catch((error) => {
        console.error(`Error ${status.toLowerCase()} property:`, error);
        setError(`Error ${status.toLowerCase()} property. Please try again.`);
      });
  };  

  const renderDetails = (property) => {
    return Object.entries(property).map(([key, value]) => (
      <Typography
        key={key}
        variant="body2"
        sx={{ marginBottom: 0.5, color: "text.secondary" }}
      >
        <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value || "N/A"}
      </Typography>
    ));
  };

  const handleToggleSection = (type) => {
    setOpenSection((prev) => (prev === type ? null : type));
  };

  if (error) {
    return (
      <Box>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "primary.main",
          marginBottom: "20px",
        }}
      >
        Pending Approvals
      </Typography>

      {Object.keys(pendingApprovals).map((type) => (
        <Box key={type} mb={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => handleToggleSection(type)}
            sx={{
              cursor: "pointer",
              padding: 1,
              backgroundColor: "grey.200",
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textTransform: "capitalize",
                color: openSection === type ? "primary.main" : "text.primary",
                fontWeight: "bold",
              }}
            >
              {type}
            </Typography>
            <IconButton size="small" color="primary">
              {openSection === type ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Collapse in={openSection === type} timeout="auto" unmountOnExit>
            <Grid container spacing={3} mt={1}>
              {pendingApprovals[type]?.map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      backgroundColor: "grey.100",
                      boxShadow: 1,
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        Property ID: {property.id}
                      </Typography>
                      <Chip
                        label={type}
                        sx={{
                          marginBottom: 1,
                          color: "white",
                          backgroundColor: "primary.main",
                        }}
                      />
                      {renderDetails(property)}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleApproval(property.id, type, "Approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handleApproval(property.id, type, "Rejected")}
                        sx={{ marginLeft: 1 }}
                      >
                        Reject
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}

export default Approvals;
