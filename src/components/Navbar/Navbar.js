import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    toast.success("logout successfully");
    navigate("/login");
  };
  
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} data-testid="navbar">
        <AppBar sx={{ bgcolor: "#fee715ff", p: "10px" }} position="static">
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, color: "black" }}
            >
             PARKING BOOKING
            </Typography>

            <Button
              data-testid="button-logout"
              style={{
                textDecoration: "none",
                backgroundColor: "black ",
                padding: "8px 12px",
                color: "white",
              }}
              onClick={onLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export { Navbar as NavbarUnwrapped };
export default Navbar;