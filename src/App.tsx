import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./screens/Auth/Auth";
import CurrentCourse from "./screens/MyProfile/CurrentCourse";
import Registration from "./screens/Registration/Registration";
import { MainSidebar } from "./Admin/Sidebars/MainSidebar";
import { Admin } from "./Admin/Admin";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
