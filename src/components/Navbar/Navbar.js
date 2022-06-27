import React from "react";
import { connect } from "react-redux";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//pass the parameter isLogin, onLogout from redux
const Navbar = ({ isLogin, onLogout }) => {
  const navigate = useNavigate();

  //handle logout UI
  const logout = () => {
    onLogout();
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
       {/* only shows button logout if the user is loged in     */}
            {isLogin && (
              <Button
                data-testid="button-logout"
                style={{
                  textDecoration: "none",
                  backgroundColor: "black ",
                  padding: "8px 12px",
                  color: "white",
                }}
                onClick={logout}
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

//redux selector 
const mapStateToProps = (state) => ({
  isLogin: state.isLogin,
});

//redux action
const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch({ type: "LOGOUT" });
  },
});


export { Navbar as NavbarUnwrapped };

//combine the 2 state (action & selector from redux)
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);