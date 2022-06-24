import React, { useState } from "react";
import axios from "axios";

import { Button, TextField, Paper, Box, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const url = "http://localhost:3006/user";
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .get(url)
      .then((response) => {
        const checkAccount = response.data.find((item) => {
          return item.username === username && item.password === password;
        });
        if (checkAccount) {
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("username", checkAccount.username);
          localStorage.setItem("role", checkAccount.role);
          navigate("/");
          toast.success("login successfully");
        } else {
          toast.warning("invalid username or password");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh" }}
      data-testid="login"
    >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 1 }}
          >
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#fee715ff", color:"black" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
       
      </Grid>
      <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/aJGEVYOKE2Q)",
            backgroundRepeat: "no-repeat",

            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
    </Grid>
  );
};

export default Login;