import React from "react";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { Header1 } from "../Headers/Header1";

export const Notices = () => {
  return (
    <div>
      <div>
        <div className="d-flex">
          <MainSidebar />
          <div className="w-100">
            <Header1 />
            <div className=" w-100 px-5 py-5 grey2b">
              <div>
                <span className="fs-14">Companies | </span>

                <span className={`fs-14  green1c fw-500`}>Notices</span>
              </div>
              <div className="bg-white my-2 shadow-lg ">Hello</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
