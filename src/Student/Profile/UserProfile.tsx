import * as React from "react";
import { HeaderStudent } from "../Headers/HeaderStudent";
import { StudentSidebar } from "../Sidebars/StudentSidebar";
import BasicInfo from "./BasicInfo";
import { MyProfile } from "./MyProfile";

export default function UserProfile() {
  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
        <div>
          <MyProfile />
        </div>
        {/* <BasicInfo/> */}
        {/* <Cycle /> */}
      </div>
    </div>
  );
}
