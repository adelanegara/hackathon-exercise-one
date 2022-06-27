import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ isLogin, component: Component }) => {
  return isLogin ? <Component /> : <Navigate to="/login" />;
};

const mapStateToProps = (state) => ({
  isLogin: state.isLogin,
});

export default connect(mapStateToProps)(PrivateRoute);
