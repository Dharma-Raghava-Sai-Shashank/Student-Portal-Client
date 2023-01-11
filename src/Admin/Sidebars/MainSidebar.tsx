import React, { useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import GradingIcon from "@mui/icons-material/Grading";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { AdminSidebar } from "./AdminSidebar";
import { Header1 } from "../Headers/Header1";
import { Placement } from "../Placement/Placement";
import "./index.scss";

interface props {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

export const MainSidebar = ({ option, setOption }: props) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div>
      <div className="d-flex">
        {collapse === false ? (
          <div className="d-flex">
            <div className="MainSidebar">
              <div className="topLogo d-flex justify-content-between">
                <div className="d-flex ">
                  <div className="logo">
                    <MotionPhotosAutoIcon fontSize="large" />
                  </div>
                  <div className="LogoName">Autometa</div>
                </div>
                <button
                  className="closeButton"
                  onClick={() => {
                    setCollapse(true);
                    setOption("None");
                  }}
                >
                  <CloseOutlinedIcon fontSize="small" />
                </button>
              </div>
              <div className="recentDiv">
                <div className="recentHeading"> Recent Job Profiles</div>
                <div className="recentList">
                  <ul>
                    <li className="recentListItems">
                      <div>Dominos Technology analyst Software deve</div>
                    </li>
                    <li className="recentListItems">
                      <div>Google SOFTWARE DEVELOPMENT</div>
                    </li>
                    <li className="recentListItems">
                      <div>Dominos Technology analyst Software deve</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="recentDiv">
                <div className="recentHeading"> Ongoing Processes</div>
                <div className="recentList">
                  <ul className="">
                    <li className="recentListItems">
                      <div>Placement 22-23</div>
                    </li>
                    <li className="recentListItems">
                      <div>Internship 22-23</div>
                    </li>
                  </ul>
                </div>
              </div>
              <hr />
              <div className="MainSidebarOptions">
                <div className="MainSidebarOption">
                  <button
                    className="MainSidebarOptionButton"
                    onClick={() => setOption(() => "Profile")}
                  >
                    <div className="MainSidebarOptionButtonDiv">
                      <DescriptionOutlinedIcon className="mx-3" /> Profile
                    </div>
                  </button>
                  <button
                    className="MainSidebarOptionButton"
                    onClick={() => setOption(() => "Placement")}
                  >
                    <div className="MainSidebarOptionButtonDiv">
                      <GradingIcon className="mx-3" /> Placement
                    </div>
                  </button>
                  <button
                    className="MainSidebarOptionButton"
                    onClick={() => setOption(() => "Notices")}
                  >
                    <div className="MainSidebarOptionButtonDiv">
                      <DescriptionOutlinedIcon className="mx-3" /> Notices
                    </div>
                  </button>
                  <button
                    className="MainSidebarOptionButton"
                    onClick={() => setOption(() => "Companies")}
                  >
                    <div className="MainSidebarOptionButtonDiv">
                      <ApartmentOutlinedIcon className="mx-3" /> Companies
                    </div>
                  </button>
                  <button
                    className="MainSidebarOptionButton"
                    onClick={() => setOption(() => "Student")}
                  >
                    <div className="MainSidebarOptionButtonDiv">
                      <AccountBoxIcon className="mx-3" /> Student
                    </div>
                  </button>
                  <button
                    className="MainSidebarOptionButton"
                    onClick={() => setOption(() => "Profile")}
                  >
                    <div className="MainSidebarOptionButtonDiv">
                      <DescriptionOutlinedIcon className="mx-3" /> Profile
                    </div>
                  </button>
                  <button
                    className="MainSidebarOptionButton"
                    onClick={() => {
                      // setShowSubSidebar("admin");
                      setOption(() => "Admin");
                    }}
                  >
                    <div className="MainSidebarOptionButtonDiv">
                      <ImportantDevicesOutlinedIcon className="mx-3" /> Admin
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="topLogoHamburger d-flex justify-content-between">
            <div className="d-flex ">
              <div className="logo">
                <MotionPhotosAutoIcon fontSize="large" />
              </div>
            </div>
            <button className="closeButton" onClick={() => setCollapse(false)}>
              <MenuIcon fontSize="medium" />
            </button>
          </div>
        )}
        <div className="w-100">
          <Header1 />
          {collapse === false && option === "Admin" && (
            <AdminSidebar option={option} setOption={setOption} />
          )}
          {option === "Placement" && <Placement />}
        </div>
      </div>
    </div>
  );
};
