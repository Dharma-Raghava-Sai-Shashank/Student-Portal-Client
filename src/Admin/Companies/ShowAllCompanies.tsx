import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ShowJob } from "../Placement/ShowJob";
import { CompanyDetails } from "./CompanyDetails";

type Anchor = "top" | "left" | "bottom" | "right";

interface Column {
  id: "name" | "category/sector" | "registration";
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center" | "inherit" | "justify" | undefined;
}

const columns: Column[] = [
  { id: "name", label: "Company Name", minWidth: 220 },
  { id: "category/sector", label: "Category/Sector", minWidth: 250 },
  {
    id: "registration",
    label: "Registered On",
    minWidth: 180,
    align: "center",
  },
];

interface Data {
  name: string;
  designation: string;
  registeredOn: string;
}

function createData(
  name: string,
  designation: string,
  registeredOn: string
): Data {
  return { name, designation, registeredOn };
}

const rows = [
  createData("Google", "SDE", "22/03/2023"),
  createData("Microsoft", "SWE", "05/03/2023"),
  createData("Trilogy", "SDE", "12/01/2023"),
  createData("Samsung", "Reseacher", "22/03/2023"),
  createData("Nvidea", "Engineer", "29/01/2023"),
  createData("Sprinklr", "Implementation Consulatant", "18/03/2023"),
  createData("Standard Chartered", "Data Analyst", "01/03/2023"),
  createData("Goldman Sacs", "Business Analyst", "22/07/2023"),
  createData("Walmart", "SDE", "22/03/2023"),
];

interface props {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  session: string;
  setSession: React.Dispatch<React.SetStateAction<string>>;
  applicationId: string;
  setapplicationId: React.Dispatch<React.SetStateAction<string>>;
}

export const ShowAllCompanies = ({
  option,
  setOption,
  session,
  setSession,
  applicationId,
  setapplicationId,
}: props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const status: string[] = [
    "All",
    "Draft",
    "In Progress",
    "Accepting application",
    "Closed",
    "New",
  ];

  const [currentstatus, setCurrentStatus] = useState("All");
  const [companyId, setcompanyId] = useState("");
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
              setSession(() => text);
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
                setSession(() => text);
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

  return (
    <div className="d-flex justify-content-center">
      <div className=" w-100 px-5 py-5 grey2b">
        <div>
          <span className="fs-14">Companies </span>
          <span
            className={`fs-14 cursor-pointer ${
              companyId !== "" ? "" : " green1c fw-500"
            }`}
          >
            | {session} |
          </span>
        </div>
        <div className="bg-white my-2 shadow-lg ">
          <div>
            <div className="d-flex justify-content-between border-bottom">
              <div className="fs-18 px-3 py-2 fw-500 my-2">
                List of Companies: {session}
              </div>
              <div className=" px-3 py-2 d-flex">
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
            <div className="py-1 px-2 d-flex justify-content-between">
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ color: "#373739" }}
                >
                  {/* <RadarIcon fontSize="small" sx={{ color: "#00ae57" }} /> */}
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
              <div className="d-flex">
                <div>
                  <InputBase sx={{ ml: 1 }} placeholder="Search Company" />
                  <IconButton
                    type="button"
                    sx={{ p: "4px", mx: 2 }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <div>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column?.align}
                            style={{ minWidth: column.minWidth }}
                            sx={{ px: 0 }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, item) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={item}
                              className="cursor-pointer"
                            >
                              <TableCell sx={{ py: 1, mx: 3 }}>
                                <Avatar
                                  className={"doctorcolor"}
                                  aria-label="recipe"
                                  sx={{ width: 37, height: 37 }}
                                  onClick={() => {
                                    setcompanyId(() => row.name + item);
                                  }}
                                >
                                  {row.name[0]}
                                </Avatar>
                              </TableCell>
                              <TableCell key="id" sx={{ p: 0 }}>
                                {row["name"]}
                              </TableCell>
                              <TableCell key="category/sector" sx={{ p: 0 }}>
                                {row["designation"]}
                              </TableCell>
                              <TableCell
                                key="registeredOn"
                                sx={{ p: 0 }}
                                align="center"
                              >
                                <Typography variant="subtitle2">
                                  {row["registeredOn"]}
                                </Typography>
                              </TableCell>
                              <TableCell
                                key="action"
                                align="left"
                                sx={{ p: 0 }}
                              >
                                <Link
                                  to={`/admin/companies/${row.name + item}`}
                                >
                                  <IconButton
                                    aria-label="edit"
                                    color="success"
                                    sx={{ mx: 1 }}
                                  >
                                    <InfoOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
