import React, { useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Typography from "@mui/material/Typography";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import {Navigate, useNavigate} from "react-router-dom";

import "./index.scss";

export const HeaderStudent = () => {
  const navigate = useNavigate();

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/student/auth");
  }

  return (
    <div className="header1 d-flex justify-content-between mx-0 pt-2 text-black border">
      <div className="CollegeName flex-grow-1 d-flex align-items-center ms-3 fw-400">
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
            {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}> */}
              <span aria-describedby={id} onClick={handleClick}><AccountCircleIcon sx={{ ml: 2 }}/></span>
            {/* </Button> */}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <p><LogoutIcon fontSize="large"/><button onClick={handleLogout}>Logout</button></p>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};
