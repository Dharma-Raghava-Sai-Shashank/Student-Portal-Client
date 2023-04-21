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
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
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
import moment from "moment";
import { fetchAllPlacementCycles } from "../../api/placementCycle.service";
import { deleteJob, fetchJobsForAdmin, searchJobsForAdmin } from "../../api/job.service";

type Anchor = "top" | "left" | "bottom" | "right";

interface Column {
  id: "name" | "designation" | "status";
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center" | "inherit" | "justify" | undefined;
}

const columns: Column[] = [
  { id: "name", label: "Company Name", minWidth: 180 },
  { id: "designation", label: "Designation", minWidth: 220 },
  {
    id: "status",
    label: "Status",
    minWidth: 180,
    align: "center",
  },
];

interface Data {
  id: number,
  name: string;
  designation: string;
  status: string;
}

function createData(job: any): Data {
  return {
    id: job.nfId,
    name: job.companyName,
    designation: job.profile,
    status: (job.status === "Draft") ? "Draft" : (moment(Date.now()) < moment(job.deadline)) ? "Accepting Application" : "Applications Closed"
  }
}

// const jobs = [
//   createData("Google", "SDE", "Accepting application"),
//   createData("Microsoft", "SWE", "In Progress"),
//   createData("Trilogy", "SDE", "New"),
//   createData("Samsung", "Reseacher", "Closed"),
//   createData("Nvidea", "Engineer", "In Progress"),
//   createData("Sprinklr", "Implementation Consulatant", "Accepting application"),
//   createData("Standard Chartered", "Data Analyst", "New"),
//   createData("Goldman Sacs", "Business Analyst", "Draft"),
//   createData("Walmart", "SDE", "Closed"),
//   createData("Google", "SDE", "Accepting application"),
//   createData("Microsoft", "SWE", "In Progress"),
//   createData("Trilogy", "SDE", "Closed"),
//   createData("Samsung", "Reseacher", "Closed"),
//   createData("Nvidea", "Engineer", "In Progress"),
//   createData("Sprinklr", "Implementation Consulatant", "Accepting application"),
//   createData("Standard Chartered", "Data Analyst", "Draft"),
//   createData("Goldman Sacs", "Business Analyst", "Draft"),
//   createData("Walmart", "SDE", "New"),
//   createData("Google", "SDE", "Accepting application"),
//   createData("Microsoft", "SWE", "In Progress"),
//   createData("Trilogy", "SDE", "Closed"),
//   createData("Samsung", "Reseacher", "Closed"),
//   createData("Nvidea", "Engineer", "In Progress"),
//   createData("Sprinklr", "Implementation Consulatant", "Accepting application"),
//   createData("Standard Chartered", "Data Analyst", "Draft"),
//   createData("Goldman Sacs", "Business Analyst", "Draft"),
//   createData("Walmart", "SDE", "Closed"),
//   createData("Google", "SDE", "Accepting application"),
//   createData("Microsoft", "SWE", "In Progress"),
//   createData("Trilogy", "SDE", "Closed"),
//   createData("Samsung", "Reseacher", "Closed"),
//   createData("Nvidea", "Engineer", "In Progress"),
//   createData("Sprinklr", "Implementation Consulatant", "Accepting application"),
//   createData("Standard Chartered", "Data Analyst", "Draft"),
//   createData("Goldman Sacs", "Business Analyst", "Draft"),
//   createData("Walmart", "SDE", "Closed"),
//   createData("Google", "SDE", "Accepting application"),
//   createData("Microsoft", "SWE", "In Progress"),
//   createData("Trilogy", "SDE", "Closed"),
//   createData("Samsung", "Reseacher", "Closed"),
//   createData("Nvidea", "Engineer", "In Progress"),
//   createData("Sprinklr", "Implementation Consulatant", "Accepting application"),
//   createData("Standard Chartered", "Data Analyst", "Draft"),
//   createData("Goldman Sacs", "Business Analyst", "Draft"),
//   createData("Walmart", "SDE", "Closed"),
// ];

interface props {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  session: string;
  setSession: React.Dispatch<React.SetStateAction<string>>;
}

export const NFTableShow = ({
  option,
  setOption,
  session,
  setSession,
}: props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [jobs, setJobs] = React.useState<Data[]>([]);
  const [query, setQuery] = React.useState<string>("");
  const [placementCycles, setPlacementCycles] = React.useState<
    PlacementCycle.RootObject[]
  >([]);
  const [placementCycleId, setPlacementCycleId] = React.useState<number>(0);
  const [acadYears, setAcadYears] = React.useState<string[]>([]);

  const resetState = () => {
    setRowsPerPage(25);
    setQuery("");
  };

  const handlePlacementCycleSelection = (cycleId: number) => {
    setPlacementCycleId(cycleId);
    resetState();
  };

  React.useEffect(() => {
    const initialFetch = async () => {
      const { cycles } = await fetchAllPlacementCycles();

      setPlacementCycles(cycles);
      const years: string[] = [];
      cycles?.map((cycle: PlacementCycle.RootObject) => {
        if (!years.includes(cycle?.acadYear?.year as string)) years.push(cycle.acadYear?.year as string);
        return cycle;
      });
      setAcadYears(years);
      setPlacementCycleId(cycles?.[0]?.placementCycleId);
    };
    initialFetch();
  }, []);

  React.useEffect(() => {
    const fetchJobs = async () => {
      const { jobs } =
        query && query !== ""
          ? await searchJobsForAdmin(placementCycleId, query)
          : await fetchJobsForAdmin(placementCycleId);
      setJobs(jobs?.map((item: any) => createData(item)));
    };
    fetchJobs();
  }, [query, placementCycleId]);

  const handleDeleteJob = async (jobId: number) => {
    const { success } = await deleteJob(jobId);
    if(success)
    setJobs(jobs.filter((job: Data) => job.id!==jobId));
  }

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
    "Accepting Application",
    "Applications Closed",
  ];
  // const status: string[] = [
  //   "All",
  //   "Draft",
  //   "In Progress",
  //   "Accepting application",
  //   "Closed",
  //   "New",
  // ];

  const [currentstatus, setCurrentStatus] = useState("All");
  const [showJobId, setShowJobId] = useState("");
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
      {acadYears.map((year: string) => {
        return (
          <div key={year}>
            <List>
              {placementCycles
                .filter(
                  (cycle: PlacementCycle.RootObject) => cycle.acadYear?.year === year
                )
                .map((cycle: PlacementCycle.RootObject) => (
                  <ListItem
                    key={cycle.placementCycleId}
                    disablePadding
                    onClick={() => {
                      //   toggleDrawer(anchor, false);
                      setSession(() => cycle.placementCycleName);
                    }}
                    style={{
                      backgroundColor: `${
                        placementCycleId === cycle.placementCycleId
                          ? "#e6e6ff"
                          : "#fff"
                      }`,
                    }}
                    onClickCapture={() =>
                      handlePlacementCycleSelection(cycle.placementCycleId as number)
                    }
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <CalendarMonthIcon />
                      </ListItemIcon>
                      <ListItemText primary={cycle.placementCycleName} />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
            <Divider />
          </div>
        );
      })}
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
  const statushandlecolor = (status: string) => {
    if (status === "Applications Closed") return "text-muted fs-12";
    else if (status === "Accepting application") return "green1c";
    else return "text-info";
  };
  // const statushandlecolor = (status: string) => {
  //   if (status === "Closed") return "text-muted fs-12";
  //   else if (status === "New") return "text-danger fw-600 fs-14";
  //   else if (status === "In Progress") return "text-primary";
  //   else if (status === "Accepting application") return "green1c";
  //   else return "text-info";
  // };
  return (
    <div className="d-flex justify-content-center">
      <div className=" w-100 px-5 py-5 grey2b">
        <div>
          <span className="fs-14">Placement </span>
          <span
            className={`fs-14 cursor-pointer ${
              showJobId !== "" ? "" : " green1c fw-500"
            }`}
            onClick={() => {
              setOption(() => "Placement");
              setShowJobId(() => "");
            }}
          >
            | {session} |
          </span>
          {showJobId !== "" && (
            <span className={`fs-14  green1c fw-500`}> {showJobId} </span>
          )}
        </div>
        <div className="bg-white my-2 shadow-lg ">
          <div>
            <div className="d-flex justify-content-between border-bottom">
              <div className="fs-18 px-3 py-2 fw-500 my-2">{session}</div>
              <div className=" px-3 py-2 d-flex">
                <div className="my-1">
                  <Button sx={{ color: "#00ae57", fontSize: "12px" }}>
                    <EditOutlinedIcon fontSize="small" sx={{ mx: 1 }} />
                    Edit Placement
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
                  <Button
                    sx={{ color: "#00ae57" }}
                    onClick={() => {
                      setOption(() => "Add New Job");
                    }}
                    className="fw-600 capitalize"
                  >
                    <AddCircleOutlineOutlinedIcon
                      fontSize="small"
                      sx={{ mx: 1 }}
                    />
                    Add New Job
                  </Button>
                </div>
                <div className="mx-2">
                  <Button
                    sx={{ color: "#00ae57" }}
                    className="fw-600 capitalize"
                  >
                    <FilterAltOutlinedIcon fontSize="small" sx={{ mx: 1 }} />{" "}
                    Check Eligibilty
                  </Button>
                </div>
                <div>
                  <InputBase
                    sx={{ ml: 1 }}
                    placeholder="Search Company"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "4px" }}
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
                      {jobs.filter((job: any) => currentstatus === "All" || job.status === currentstatus)
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
                              <TableCell sx={{ p: 1 }}>
                                <Link
                                  to={`/admin/placement${row.name + item}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  <Avatar
                                    className={"doctorcolor"}
                                    aria-label="recipe"
                                    sx={{ width: 32, height: 32 }}
                                  >
                                    {row.name[0]}
                                  </Avatar>
                                </Link>
                              </TableCell>
                              <TableCell key="id" sx={{ p: 0 }}>
                                <Link
                                  to={`/admin/placement/${row.name + item}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  {row["name"]}
                                </Link>
                              </TableCell>
                              <TableCell key="designation" sx={{ p: 0 }}>
                                <Link
                                  to={`/admin/placement/${row.name + item}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  {row["designation"]}
                                </Link>
                              </TableCell>
                              <TableCell
                                key="status"
                                sx={{ p: 0 }}
                                align="center"
                                onClick={() => {
                                  setShowJobId(() => row.name + item);
                                }}
                              >
                                <Link
                                  to={`/admin/placement/${row.name + item}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    className={`${statushandlecolor(
                                      row["status"]
                                    )}`}
                                  >
                                    {row["status"]}
                                  </Typography>
                                </Link>
                              </TableCell>
                              <TableCell
                                key="action"
                                align="left"
                                sx={{ p: 0 }}
                              >
                                <IconButton
                                  aria-label="edit"
                                  color="success"
                                  sx={{ mx: 1 }}
                                >
                                  <EditOutlinedIcon fontSize="small" />
                                </IconButton>
                                <IconButton aria-label="delete" sx={{ mx: 1 }} onClick={() => handleDeleteJob(row.id)}>
                                  <DeleteIcon fontSize="small"/>
                                </IconButton>
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
                  count={jobs.length}
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
