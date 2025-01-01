import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Both fields are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/v1/admin/login", {
        username,
        password,
      });
      localStorage.setItem("authToken", response.data.token);
      navigate("/dashboard/list-property");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="97vh"
      bgcolor="grey.100"
    >
      <Paper elevation={3} style={{ padding: "30px", width: "350px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Admin Login
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
