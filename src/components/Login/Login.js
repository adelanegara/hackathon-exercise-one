import React, { useState } from "react";
import { connect } from "react-redux";

import { Button, TextField, Paper, Box, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ account, onLogin, setUserData }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkAccount = account.find((item) => {
      return item.username === username && item.password === password;
    });
    if (checkAccount) {
      setUserData(checkAccount);
      onLogin();
      toast.success("Login Succesfully");
      navigate("/");
    } else {
      toast.error("Invalid username or password");
    }
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
            onSubmit={handleSubmit}
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
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",

            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data) => {
    dispatch({ type: "SET_USER_DATA", payload: data });
  },
  onLogin: () => {
    dispatch({ type: "LOGIN" });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);