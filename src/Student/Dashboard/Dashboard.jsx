import * as React from "react";
import { HeaderStudent } from "../Headers/HeaderStudent";
import { StudentSidebar } from "../Sidebars/StudentSidebar";

export default function DashBoard() {
  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
        {/* <Cycle /> */}
      </div>
    </div>
  );
}
