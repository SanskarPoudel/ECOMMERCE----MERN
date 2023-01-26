import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRole }) => {
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.userAuth
  );

  return isAuthenticated ? (
    user.role.includes(allowedRole) ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
