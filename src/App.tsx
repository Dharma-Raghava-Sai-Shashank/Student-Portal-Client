import { Routes, Route } from "react-router-dom";
import Auth from "./screens/Auth/Auth";
import Registration from "./screens/Registration/Registration";
import { Admin } from "./Admin/Admin";
import { Placement } from "./Admin/Placement/Placement";
import {Users} from "./Admin/Users/Users";
import { PlacementCycle } from "./Admin/Department/Department";
import { Companies } from "./Admin/Companies/Companies";
import { CompanyDetails } from "./Admin/Companies/CompanyDetails";
import { ShowJob } from "./Admin/Placement/ShowJob";
import AdminAuth from "./Admin/Auth/Auth";
import { CycleDetails } from "./Admin/Department/CycleDetails";
import { AcadYearProgram } from "./Admin/Programs/AcadYearProgram";
import UserProfile from "./Student/Profile/UserProfile";
import JobProfile from "./Student/Job Profiles/JobProfile";
import JobProfileDetail from "./Student/Job Profiles/JobProfileDetail";
import DashBoard from "./Student/Dashboard/Dashboard";
import { Notices } from "./Admin/Notices/Notices";
import { RespExtra } from "./Student/Dashboard/RespExtra";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { clearMessage } from "./Slices/message";
import AuthVerify from "./common/AuthVerify";
import { useCallback, useEffect } from "react";
import { logout } from "./Slices/auth";
import EventBus from "./common/EventBus";
import AdminRoute from "./common/AdminRoute";
import StudentRoute from "./common/StudentRoute";
import { Programs } from "./Admin/Programs/Programs";
import { HomeScreen } from "./HomeScreen/HomeScreen";
import { SignIn } from "./Company/SignIn";
import { Dashboard } from "./Company/Dashboard";
import { CompanyProfile } from "./Company/CompanyProfile";
import ContactUs from "./Company/ContactUs";
import { CompanyRegistration } from "./Company/Registration";

const ProtectRoute: any = (Component: React.FC<{}>) => {
  return (
    <AdminRoute>
      <Component />
    </AdminRoute>
  );
};
const ProtectStudentRoute: any = (Component: React.FC<{}>) => {
  return (
    <StudentRoute>
      <Component />
    </StudentRoute>
  );
};

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
        <Route path="/" element={<HomeScreen />} />

        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/admin" element={ProtectRoute(Admin)} />
        <Route path="/admin/placement" element={<Placement />} />   {/* //unprotected the placement route right now because it was giving some error due to it */}
        <Route path="/admin/programs" element={ProtectRoute(AcadYearProgram)} />
        <Route
          path="/admin/programs/:acadYear"
          element={ProtectRoute(Programs)}
        />
        <Route
          path="/admin/placement/:applicationId"
          element={ProtectRoute(ShowJob)}
        />
        <Route
          path="/admin/placementcycle"
          element={ProtectRoute(PlacementCycle)}
        />
        <Route
          path="/admin/users"
          element={ProtectRoute(Users)}
        />
        <Route path="/admin/notices" element={ProtectRoute(Notices)} />
        <Route
          path="/admin/placementcycle/:cycleId"
          element={ProtectRoute(CycleDetails)}
        />
        <Route path="/admin/companies" element={ProtectRoute(Companies)} />
        <Route
          path="/admin/companies/:companyId"
          element={ProtectRoute(CompanyDetails)}
        />
        <Route path="/student/auth" element={<Auth />} />
        <Route path="/company/auth" element={<Auth />} />
        <Route path="/student/profile" element={<UserProfile />} />
        <Route path="/student/jobprofile" element={<JobProfile />} />
        <Route path="/student/jobprofile/:id" element={<JobProfileDetail />} />
        <Route path="/student/dashboard" element={<DashBoard />} />
        <Route path="/student/extras" element={<RespExtra />} />

        <Route path="/company/signin" element={<SignIn />} />
        <Route path="/company/dashboard" element={<Dashboard />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/company/contactus" element={<ContactUs />} />
        <Route path="/company/registration" element={<CompanyRegistration />} />
      </Routes>
      <AuthVerify logOut={logOut} />
    </>
  );
}

export default App;
