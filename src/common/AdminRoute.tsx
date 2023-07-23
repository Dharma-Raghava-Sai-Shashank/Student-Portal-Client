import React from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";
import { AuthState } from "../Slices/auth";
import { ADMIN } from '../Admin/constants';

const AdminRoute = ({
  children: Component,
}: {
  children: any;
}) => {
  const auth: AuthState = useAppSelector((state) => state.auth);

  if (!auth.isLoggedIn && auth.role!==ADMIN) {
    return <Navigate to="/admin/auth" replace />;
  }
  else if (auth.isLoggedIn && auth.role!==ADMIN) {
    return <Navigate to="/admin/auth" replace />;
  }
  return Component;
};

export default AdminRoute;







