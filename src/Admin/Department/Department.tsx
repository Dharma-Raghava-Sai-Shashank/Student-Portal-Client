import React, { useState } from "react";
import { MainSidebar } from "../Sidebars/MainSidebar";
import CreateDepartment from "./CreateDeparment";
import { Header1 } from "../Headers/Header1";

export const Department = () => {
  return (
    <div className="d-flex">
      <MainSidebar
      // option={option}
      // setOption={setOption}
      // session={session}
      // setSession={setSession}
      />
      <div className="w-100">
        <Header1 />
        <CreateDepartment />
      </div>
    </div>
  );
};
