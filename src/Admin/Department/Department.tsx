import React, { useState } from "react";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { Header1 } from "../Headers/Header1";
import { Cycle } from "./Cycle";

export const PlacementCycle = () => {
  return (
    <div className="d-flex">
      <MainSidebar />
      <div className="w-100">
        <Header1 />
        <Cycle />
      </div>
    </div>
  );
};
