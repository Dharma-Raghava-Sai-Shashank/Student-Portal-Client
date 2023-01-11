import React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import "./index.scss";

export const Header1 = () => {
  return (
    <div className="header1 d-flex justify-content-between w-100 shadow">
      <div className="CollegeName flex-grow-1 p-3">
        Indian Institute of Technology Indian School of Mines, Dhanbad
      </div>
      <div>
        <div className="d-flex mt-2">
          <div className="">
            <IconButton type="button" sx={{ p: "4px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Student"
              inputProps={{ "aria-label": "search student" }}
            />
          </div>
          <div className="verticalLine"></div>
          <NotificationsNoneOutlinedIcon sx={{ color: "red" }} />
          <div className="verticalLine"></div>

          <div className="d-flex">
            <div className="UserName mx-3 mt-1">User Name</div>
            <AccountCircleIcon fontSize="large" sx={{ mx: "5px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
