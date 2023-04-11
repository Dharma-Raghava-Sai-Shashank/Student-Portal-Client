import { Routes, Route } from "react-router-dom";
import Auth from "./screens/Auth/Auth";
import Registration from "./screens/Registration/Registration";
import { Admin } from "./Admin/Admin";
import { Placement } from "./Admin/Placement/Placement";
import { PlacementCycle } from "./Admin/Department/Department";
import { Companies } from "./Admin/Companies/Companies";
import { CompanyDetails } from "./Admin/Companies/CompanyDetails";
import { ShowJob } from "./Admin/Placement/ShowJob";
import AdminAuth from "./Admin/Auth/Auth";
import CycleDepartment from "./Admin/Department/CreateDeparment";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { clearMessage } from "./Slices/message";
import AuthVerify from "./common/AuthVerify";
import { useCallback, useEffect } from "react";
import { logout } from "./Slices/auth";
import EventBus from "./common/EventBus";

function App() {
  const { open, message, type } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(clearMessage());
  };

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type as AlertColor}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route path="/admin/placement" element={<Placement />} />
        <Route path="/admin/placement/:applicationId" element={<ShowJob />} />
        <Route path="/admin/placementcycle" element={<PlacementCycle />} />
        <Route
          path="/admin/placementcycle/:cycleId"
          element={<CycleDepartment />}
        />
        <Route path="/admin/companies" element={<Companies />} />
        <Route
          path="/admin/companies/:companyId"
          element={<CompanyDetails />}
        />
      </Routes>
      <AuthVerify logOut={logOut} />
    </>
  );
}

export default App;
