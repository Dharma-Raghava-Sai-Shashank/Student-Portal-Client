import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./index.scss";

export const HeaderStudent = () => {
  return (
    <div className="header1 d-flex justify-content-between shadow m-0 text-black">
      <div className="CollegeName flex-grow-1 p-3">
        Indian Institute of Technology Indian School of Mines, Dhanbad
      </div>
      <div>
        <div className="d-flex mt-2">
          <div className="verticalLine"></div>
          <Badge variant="dot" color="primary">
            <NotificationsIcon color="action" />
          </Badge>
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
