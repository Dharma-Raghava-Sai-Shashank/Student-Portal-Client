import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Auth from "./screens/Auth/Auth";
import Registration from "./screens/Registration/Registration";
import { Admin } from "./Admin/Admin";
import { Placement } from "./Admin/Placement/Placement";
import { Department } from "./Admin/Department/Department";
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
        <Route path="/admin/department" element={<Department />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
