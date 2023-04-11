import React from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";
import { AuthState } from "../Slices/auth";
import { STUDENT } from '../Admin/constants';

const StudentRoute = ({
  children: Component,
}: {
  children: any;
}) => {
  const auth: AuthState = useAppSelector((state) => state.auth);

  if (!auth.isLoggedIn || auth.role!== STUDENT) {
    return <Navigate to="/" replace />;
  }
  return Component;
};

export default StudentRoute;
