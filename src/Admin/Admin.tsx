import React, { useState } from "react";
import { MainSidebar } from "./Sidebars/MainSidebar";

export const Admin: React.FC = () => {
  const [option, setOption] = useState<string>("");
  return (
    <div>
      <MainSidebar option={option} setOption={setOption} />
    </div>
  );
};
