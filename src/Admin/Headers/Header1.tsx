import React, { useRef } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import "./index.scss";
import {Navigate, useNavigate} from "react-router-dom";
import Popover from '@mui/material/Popover';
import LogoutIcon from '@mui/icons-material/Logout';

export const Header1 = () => {

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
    navigate("/");
  }

  return (
    <div className="header1 d-flex justify-content-between w-100 shadow">
      <div className="CollegeName flex-grow-1 p-3">
        Indian Institute of Technology Indian School of Mines, Dhanbad
      </div>
      <div>
        <div className="d-flex mt-2">
          {/* <div className="">
            <IconButton type="button" sx={{ p: "4px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Student"
              inputProps={{ "aria-label": "search student" }}
            />
          </div> */}
          <div className="verticalLine"></div>
          <NotificationsNoneOutlinedIcon sx={{ color: "red" }} />
          <div className="verticalLine"></div>

          <div className="d-flex">
            <div className="UserName mx-3 mt-1">User Name</div>
            <span aria-describedby={id} onClick={handleClick}><AccountCircleIcon fontSize="large" sx={{ mx: "5px" }} /></span>
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
              <button onClick={handleLogout}><LogoutIcon fontSize="large"/>Logout</button>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};
