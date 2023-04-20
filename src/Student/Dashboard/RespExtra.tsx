import React from "react";
import { HeaderStudent } from "../Headers/HeaderStudent";
import { StudentSidebar } from "../Sidebars/StudentSidebar";
import { Extras } from "./Extras";

export const RespExtra = () => {
  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
        <Extras />
      </div>
    </div>
  );
};
