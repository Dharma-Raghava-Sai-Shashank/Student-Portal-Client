import React, { useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import GradingIcon from "@mui/icons-material/Grading";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./index.scss";

// interface props {
//   option: string;
//   setOption: React.Dispatch<React.SetStateAction<string>>;
//   session: string;
//   setSession: React.Dispatch<React.SetStateAction<string>>;
// }

export const MainSidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const [collapseadmin, setCollapseAdmin] = useState(false);

  return (
    <div>
      <div className="d-flex h-100">
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
                    // setOption("None");
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
                  <Link to="/admin/profile">
                    <button className="MainSidebarOptionButton">
                      <div className="MainSidebarOptionButtonDiv">
                        <DescriptionOutlinedIcon className="mx-3" /> Profile
                      </div>
                    </button>
                  </Link>
                  <Link to="/admin/placement">
                    <button className="MainSidebarOptionButton">
                      <div className="MainSidebarOptionButtonDiv">
                        <GradingIcon className="mx-3" /> Placement
                      </div>
                    </button>
                  </Link>
                  <Link to="/admin/notices">
                    <button className="MainSidebarOptionButton">
                      <div className="MainSidebarOptionButtonDiv">
                        <DescriptionOutlinedIcon className="mx-3" /> Notices
                      </div>
                    </button>
                  </Link>
                  <Link to="/admin/companies">
                    <button className="MainSidebarOptionButton">
                      <div className="MainSidebarOptionButtonDiv">
                        <ApartmentOutlinedIcon className="mx-3" /> Companies
                      </div>
                    </button>
                  </Link>
                  <button className="MainSidebarOptionButton">
                    <div className="MainSidebarOptionButtonDiv">
                      <AccountBoxIcon className="mx-3" /> Student
                    </div>
                  </button>
                  <button className="MainSidebarOptionButton">
                    <div className="MainSidebarOptionButtonDiv">
                      <DescriptionOutlinedIcon className="mx-3" /> Profile
                    </div>
                  </button>
                  <button
                    className="MainSidebarOptionButton"
                    onClick={() => {
                      setCollapseAdmin((prev) => !prev);
                    }}
                  >
                    <div className="MainSidebarOptionButtonDiv d-flex justify-content-between">
                      <div>
                        <ImportantDevicesOutlinedIcon className="mx-3" /> Admin
                      </div>
                      <div>
                        {!collapseadmin ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowUpIcon />
                        )}
                      </div>
                    </div>
                  </button>
                  {collapseadmin === true && (
                    <div>
                      <Link to="/admin/placementcycle">
                        <button className="MainSidebarOptionButton ps-4">
                          <div className="MainSidebarOptionButtonDiv d-flex justify-content-between ms-4">
                            <div className="fs-14 mx-3">Placement Cycle</div>
                          </div>
                        </button>
                      </Link>
                      <Link to="/admin/programs">
                        <button className="MainSidebarOptionButton ps-4">
                          <div className="MainSidebarOptionButtonDiv d-flex justify-content-between ms-4">
                            <div className="fs-14 mx-3">Edit Programs</div>
                          </div>
                        </button>
                      </Link>
                      <Link to="/admin/users">
                        <button className="MainSidebarOptionButton ps-4">
                          <div className="MainSidebarOptionButtonDiv d-flex justify-content-between ms-4">
                            <div className="fs-14 mx-3">Users</div>
                          </div>
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="topLogoHamburger">
            <div className="d-flex justify-content-center">
              <div className="logo">
                <MotionPhotosAutoIcon fontSize="large" />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="closeButton"
                onClick={() => setCollapse(false)}
              >
                <MenuIcon fontSize="medium" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
