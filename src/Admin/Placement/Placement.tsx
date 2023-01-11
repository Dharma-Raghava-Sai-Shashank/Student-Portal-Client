import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

type Anchor = "top" | "left" | "bottom" | "right";

export const Placement = () => {
  const status: string[] = [
    "All",
    "Draft",
    "Completed",
    "In Progress",
    "Accepting Application",
    "Closed for Application",
  ];
  const [currentstatus, setCurrentStatus] = useState("All");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          "Full Time Hiring 2023-24",
          "Intern Hiring 2023-24",
          "PSU Hiring 2023-24",
        ].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => {
              //   toggleDrawer(anchor, false);
              setSession(text);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Full Time Hiring 2022-23", "Intern Hiring 2022-23"].map(
          (text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => {
                setSession(text);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [session, setSession] = useState("Full Time Hiring 2023-24");
  return (
    <div className="d-flex justify-content-center">
      <div className=" w-100 px-5 py-5 grey2b">
        <div>
          <span className="green1c fw-500 fs-14">Placement </span>
          <span className=" fs-14">| {session} </span>
        </div>
        <div className="bg-white my-2 shadow-lg ">
          <div className="d-flex justify-content-between border-bottom">
            <div className="fs-18 px-3 py-2 fw-500 my-2">{session}</div>
            <div className=" px-3 py-2 d-flex">
              <div className="my-1">
                <Button sx={{ color: "#00ae57", fontSize: "12px" }}>
                  <EditOutlinedIcon fontSize="small" sx={{ mx: 1 }} /> Edit
                  Placement
                </Button>
              </div>
              <React.Fragment>
                <Button onClick={toggleDrawer("right", true)}>
                  <MenuIcon className="grey1c" />
                </Button>
                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  {list("right")}
                </Drawer>
              </React.Fragment>
            </div>
          </div>
          <div className="py-3 px-2 d-flex justify-content-between">
            <div style={{ width: "280px" }}>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: "#373739" }}
              >
                Status : {currentstatus}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {status.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={() => {
                      handleClose();
                      setCurrentStatus(item);
                    }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </div>

            <div>
              <Button sx={{ color: "#00ae57" }}>
                <AddCircleOutlineOutlinedIcon fontSize="small" sx={{ mx: 1 }} />{" "}
                Add New Job
              </Button>
            </div>
            <div>
              <Button sx={{ color: "#00ae57" }}>
                <FilterAltOutlinedIcon fontSize="small" sx={{ mx: 1 }} /> Check
                Eligibilty
              </Button>
            </div>
            <div className=" border">
              <InputBase sx={{ ml: 1 }} placeholder="Search Company" />
              <IconButton type="button" sx={{ p: "4px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
