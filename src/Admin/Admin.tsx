import React, { useState } from "react";
import { MainSidebar } from "./Sidebars/MainSidebar";

export const Admin: React.FC = () => {
  const [option, setOption] = useState<string>("");
  const [session, setSession] = useState<string>("Full Time Hiring 2023-24");

  return (
    <div>
      <MainSidebar
        option={option}
        setOption={setOption}
        session={session}
        setSession={setSession}
      />
    </div>
  );
};
