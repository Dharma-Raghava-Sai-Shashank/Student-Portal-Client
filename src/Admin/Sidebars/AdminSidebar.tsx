import React, { useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import GradingIcon from "@mui/icons-material/Grading";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import Deparment from "../Department/CreateDeparment";
import "./index.scss";

interface props {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

export const AdminSidebar = ({ option, setOption }: props) => {
  const [selected, setSeleted] = useState<number>(0);

  return (
    <div className="d-flex ">
      <div className="d-flex w-100">
        <div className="SubSidebar">
          <div className="topLogo d-flex justify-content-end closeDiv">
            <button className="closeButton" onClick={() => setOption("None")}>
              <CloseOutlinedIcon fontSize="small" />
            </button>
          </div>

          <div className="">
            <div className="Sidebar">
              <div className="SidebarOptions">
                <div className="SidebarOption py-2">
                  <div
                    className={`SidebarOptionButtonDiv ${
                      selected === 1 ? "SidebarOptionButtonSelected" : ""
                    }`}
                  >
                    <button
                      className={`SidebarOptionButton`}
                      onClick={() => setSeleted(1)}
                    >
                      <div className=" ">department</div>
                    </button>
                  </div>
                  <div
                    className={`SidebarOptionButtonDiv ${
                      selected === 2 ? "SidebarOptionButtonSelected" : ""
                    }`}
                  >
                    <button
                      className={`SidebarOptionButton`}
                      onClick={() => setSeleted(2)}
                    >
                      <div className=" ">Placement</div>
                    </button>
                  </div>
                  <div
                    className={`SidebarOptionButtonDiv ${
                      selected === 3 ? "SidebarOptionButtonSelected" : ""
                    }`}
                  >
                    <button
                      className={`SidebarOptionButton`}
                      onClick={() => setSeleted(3)}
                    >
                      <div className=" ">Notices</div>
                    </button>
                  </div>
                  <div
                    className={`SidebarOptionButtonDiv ${
                      selected === 4 ? "SidebarOptionButtonSelected" : ""
                    }`}
                  >
                    <button
                      className={`SidebarOptionButton`}
                      onClick={() => setSeleted(4)}
                    >
                      <div className=" ">Companies</div>
                    </button>
                  </div>
                  <div
                    className={`SidebarOptionButtonDiv ${
                      selected === 5 ? "SidebarOptionButtonSelected" : ""
                    }`}
                  >
                    <button
                      className={`SidebarOptionButton`}
                      onClick={() => setSeleted(5)}
                    >
                      <div className=" ">Student</div>
                    </button>
                  </div>
                  <div
                    className={`SidebarOptionButtonDiv ${
                      selected === 6 ? "SidebarOptionButtonSelected" : ""
                    }`}
                  >
                    <button
                      className={`SidebarOptionButton`}
                      onClick={() => setSeleted(6)}
                    >
                      <div className=" ">Profile</div>
                    </button>
                  </div>
                  <div
                    className={`SidebarOptionButtonDiv ${
                      selected === 7 ? "SidebarOptionButtonSelected" : ""
                    }`}
                  >
                    <button
                      className={`SidebarOptionButton `}
                      onClick={() => setSeleted(7)}
                    >
                      <div className=" ">Admin</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 mg-0 pd-0">{selected === 1 && <Deparment />}</div>
      </div>
    </div>
  );
};
