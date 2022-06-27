import React from "react";
import { connect } from "react-redux";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";

const Navbar = ({ isLogin, onLogout }) => {


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
            {isLogin && (
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
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLogin: state.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch({ type: "LOGOUT" });
  },
});

export { Navbar as NavbarUnwrapped };
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
