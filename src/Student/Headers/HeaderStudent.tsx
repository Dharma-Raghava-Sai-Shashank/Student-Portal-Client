import React, { useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Typography from "@mui/material/Typography";

import "./index.scss";

export const HeaderStudent = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  return (
    <div className="header1 d-flex justify-content-between mx-0 pt-2 text-black border">
      <div className="CollegeName flex-grow-1 d-flex align-items-center ms-3 ">
        {windowSize.current[0] > 720 ? (
          <Typography variant="h6" gutterBottom>
            Indian Institute of Technology (ISM), Dhanbad
          </Typography>
        ) : (
          <Typography variant="subtitle1" gutterBottom>
            IIT (ISM), Dhanbad
          </Typography>
        )}
      </div>
      <div>
        <div className="d-flex mt-2">
          {/* <div className="verticalLine"></div> */}
          <Badge variant="dot" color="primary">
            <NotificationsIcon className="" />
          </Badge>
          {/* <div className="verticalLine"></div> */}

          <div className="d-flex mx-3">
            {/* <div className="UserName mx-3 mt-1">User Name</div> */}
            <AccountCircleIcon sx={{ ml: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
};
