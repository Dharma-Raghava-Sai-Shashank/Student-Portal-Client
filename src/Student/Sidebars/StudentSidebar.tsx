import React, { useState, useRef } from "react";
import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Link } from "react-router-dom";
import "./index.scss";
import { Box } from "@mui/material";

export const StudentSidebar = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  const resizeWindow = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <>
      {width >= 700 ? (
        <Box className="d-flex">
          <div className="d-flex">
            <div className="MainSidebar">
              <div className="topLogo d-flex justify-content-between">
                <div className="d-flex ">
                  <div className="logo">
                    <MotionPhotosAutoIcon fontSize="large" />
                  </div>
                  <div className="LogoName">Autometa</div>
                </div>
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
        </Box>
      ) : (
        <Box
          className="d-flex"
          sx={{
            position: "fixed",
            width: "100%",
            minHeight: "5vh",
            bottom: 0,
            left: 0,
            boxSizing: "border-box",
          }}
        >
          <div
            className="topLogoHamburger responsiveSidebar"
            style={{ width: "100vw", height: "60px", padding: 0, zIndex: 99 }}
          >
            <div
              className="MainSidebar"
              style={{ width: "inherit", display: "flex", minHeight: "70px" }}
            >
              <div
                className="MainSidebarOption"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <div
                  className="d-flex justify-content-center"
                  style={{ height: "60px", width: "60px", display: "inline" }}
                >
                  <Link to="/student/dashboard">
                    <button
                      className="text-white my-1"
                      style={{
                        backgroundColor: "inherit",
                        border: "none",
                      }}
                    >
                      <HomeIcon fontSize="large" />
                    </button>
                  </Link>
                </div>
                <div
                  className="d-flex justify-content-center"
                  style={{ height: "60px", width: "60px", display: "inline" }}
                >
                  <Link to="/student/profile">
                    <button
                      className="text-white my-1"
                      style={{
                        backgroundColor: "inherit",
                        border: "none",
                      }}
                    >
                      <PermIdentityOutlinedIcon fontSize="large" />
                    </button>
                  </Link>
                </div>
                <div
                  className="d-flex justify-content-center"
                  style={{ height: "60px", width: "60px", display: "inline" }}
                >
                  <Link to="/student/jobprofile">
                    <button
                      className="text-white my-1"
                      style={{
                        backgroundColor: "inherit",
                        border: "none",
                      }}
                    >
                      <WorkOutlineIcon fontSize="large" />
                    </button>
                  </Link>
                </div>
                <div
                  className="extras text-center "
                  style={{ height: "60px", width: "60px", display: "inline" }}
                >
                  <Link to="/student/extras">
                    <button
                      className="text-white my-1"
                      style={{
                        backgroundColor: "inherit",
                        border: "none",
                      }}
                    >
                      <ViewCompactIcon fontSize="large" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Box>
      )}
    </>
  );
};
