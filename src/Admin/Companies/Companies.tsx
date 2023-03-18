import React, { useState } from "react";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { Header1 } from "../Headers/Header1";
import { ShowAllCompanies } from "./ShowAllCompanies";

export const Companies = () => {
  const [option, setOption] = useState<string>("");
  const [applicationId, setapplicationId] = useState<string>("");
  const [session, setSession] = useState<string>("Full Time Hiring 2023-24");
  return (
    <div className="d-flex">
      <MainSidebar />
      <div className="w-100">
        <Header1 />

        <ShowAllCompanies
          option={option}
          setOption={setOption}
          session={session}
          setSession={setSession}
          applicationId={applicationId}
          setapplicationId={setapplicationId}
        />
      </div>
    </div>
  );
};
