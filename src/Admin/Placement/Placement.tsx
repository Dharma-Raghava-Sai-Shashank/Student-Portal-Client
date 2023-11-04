import React, { useState } from "react";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { Header1 } from "../Headers/Header1";
import { NFTableShow } from "./NFTableShow";
import { NewJob } from "./NewJob";

export const Placement = () => {
  const [option, setOption] = useState<string>("Placement");
  const [session, setSession] = useState<string>("FT Cycle 2023-24");
  
  return (
    <div className="d-flex">
      <MainSidebar />
      <div className="w-100">
        <Header1 />

        {option === "Add New Job" ? (
          <NewJob
            option={option}
            setOption={setOption}
            session={session}
            setSession={setSession}
          />
        ) : (
          <NFTableShow
            option={option}
            setOption={setOption}
            session={session}
            setSession={setSession}
          />
        )}
      </div>
    </div>
  );
};
