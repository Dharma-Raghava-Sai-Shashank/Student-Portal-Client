import React, { useState, useRef } from "react";
import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import GradingIcon from "@mui/icons-material/Grading";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Link } from "react-router-dom";
import "./index.scss";

// interface props {
//   option: string;
//   setOption: React.Dispatch<React.SetStateAction<string>>;
//   session: string;
//   setSession: React.Dispatch<React.SetStateAction<string>>;
// }

export const StudentSidebar = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  // console.log(windowSize.current[0]);

  const [collapse, setCollapse] = useState(
    windowSize.current[0] < 720 ? true : false
  );

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
                  }}
                >
                  <CloseOutlinedIcon fontSize="small" />
                </button>
              </div>

              <div className="MainSidebarOptions my-5">
                <div className="MainSidebarOption">
                  <Link to="/student/dashboard">
                    <button className="MainSidebarOptionButton my-2">
                      <div className="MainSidebarOptionButtonDiv fs-18">
                        <HomeIcon fontSize="large" className="mx-3" />
                        Dashboard
                      </div>
                    </button>
                  </Link>
                  <Link to="/student/profile">
                    <button className="MainSidebarOptionButton my-2">
                      <div className="MainSidebarOptionButtonDiv fs-18">
                        <PermIdentityOutlinedIcon
                          className="mx-3"
                          fontSize="large"
                        />{" "}
                        My Profile
                      </div>
                    </button>
                  </Link>
                  <Link to="/student/jobprofile">
                    <button className="MainSidebarOptionButton my-2">
                      <div className="MainSidebarOptionButtonDiv fs-18">
                        <WorkOutlineIcon className="mx-3" fontSize="large" />
                        Job Profile
                      </div>
                    </button>
                  </Link>
                  <Link
                    to="/student/extras"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <button className="MainSidebarOptionButton my-2 extras">
                      <div className="MainSidebarOptionButtonDiv fs-18">
                        <ViewCompactIcon className="mx-3" fontSize="large" />
                        Extras
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="topLogoHamburger responsiveSidebar px-0 py-3">
            <div className="MainSidebar" style={{ width: "inherit" }}>
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
              <div className="topLogo p-0">
                <div className="MainSidebarOptions my-4">
                  <div className="MainSidebarOption">
                    <div className="d-flex justify-content-center">
                      <Link to="/student/dashboard">
                        <button
                          className="text-white my-3"
                          style={{ backgroundColor: "inherit", border: "none" }}
                        >
                          <HomeIcon fontSize="large" />
                        </button>
                      </Link>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Link to="/student/profile">
                        <button
                          className="text-white my-3"
                          style={{ backgroundColor: "inherit", border: "none" }}
                        >
                          <PermIdentityOutlinedIcon fontSize="large" />
                        </button>
                      </Link>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Link to="/student/jobprofile">
                        <button
                          className="text-white my-3"
                          style={{ backgroundColor: "inherit", border: "none" }}
                        >
                          <WorkOutlineIcon fontSize="large" />
                        </button>
                      </Link>
                    </div>
                    <div className="extras text-center ">
                      <Link to="/student/extras">
                        <button
                          className="text-white my-3"
                          style={{ backgroundColor: "inherit", border: "none" }}
                        >
                          <ViewCompactIcon fontSize="large" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
