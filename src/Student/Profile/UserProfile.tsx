import * as React from "react";
import { HeaderStudent } from "../Headers/HeaderStudent";
import { StudentSidebar } from "../Sidebars/StudentSidebar";
import BasicInfo from "./BasicInfo";

export default function UserProfile() {
  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
          <BasicInfo/>
        {/* <Cycle /> */}
      </div>
    </div>
  );
}
