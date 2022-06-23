import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const isLogin = localStorage.getItem("isLogin");

  return isLogin ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;