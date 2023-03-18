import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Auth from "./screens/Auth/Auth";
import Registration from "./screens/Registration/Registration";
import { Admin } from "./Admin/Admin";
import { Placement } from "./Admin/Placement/Placement";
import { Department } from "./Admin/Department/Department";
import { Companies } from "./Admin/Companies/Companies";
import { CompanyDetails } from "./Admin/Companies/CompanyDetails";
import { ShowJob } from "./Admin/Placement/ShowJob";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/placement" element={<Placement />} />
        <Route path="/admin/placement/:applicationId" element={<ShowJob />} />
        <Route path="/admin/department" element={<Department />} />
        <Route path="/admin/companies" element={<Companies />} />
        <Route
          path="/admin/companies/:companyId"
          element={<CompanyDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
