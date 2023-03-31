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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
import {
  fetchAllPlacementCycles,
  fetchCompaniesForCycle,
  searchCompany,
} from "../../api";
import moment from "moment";

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
  id: number;
  name: string;
  category: string;
  registeredOn: string;
}

function createData(company: Company.Response): Data {
  return {
    id: company.companyId,
    name: company.companyName,
    category: company.categoryName,
    registeredOn: moment(company.createdAt).format("DD-MM-YYYY"),
  };
}

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
  const [companies, setCompanies] = React.useState<Data[]>([]);
  const [query, setQuery] = React.useState<string>("");
  const [placementCycles, setPlacementCycles] = React.useState<PlacementCycle.Response[]>([]);
  const [placementCycleId, setPlacementCycleId] = React.useState<number>(0);
  const [acadYears, setAcadYears] = React.useState<string[]>([]);

  const resetState = () => {
    setRowsPerPage(25);
    setCompanies([]);
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
      const years: string[] = []
      cycles.map((cycle: PlacementCycle.Response) => {
        if (!years.includes(cycle?.acadYear))
          years.push(cycle.acadYear);
        return cycle;
      });
      setAcadYears(years);
      setPlacementCycleId(cycles?.[0]?.placementCycleId);
    };
    initialFetch();
  }, []);

  React.useEffect(() => {
    const fetchCompanies = async () => {
      const { companies } =
        query && query !== ""
          ? await searchCompany(placementCycleId, query)
          : await fetchCompaniesForCycle(placementCycleId);
      setCompanies(companies.map((item: Company.Response) => createData(item)));
    };
    fetchCompanies();
  }, [query, placementCycleId]);

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
  const [companyId, setcompanyId] = useState<number>();
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
          <>
            <List>
              {placementCycles.filter((cycle: PlacementCycle.Response) => cycle.acadYear === year).map((cycle: PlacementCycle.Response) => (
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
                    handlePlacementCycleSelection(cycle.placementCycleId)
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
          </>
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

  return (
    <div className="d-flex justify-content-center">
      <div className=" w-100 px-5 py-5 grey2b">
        <div>
          <span className="fs-14">Companies </span>
          <span
            className={`fs-14 cursor-pointer ${
              companyId ? "" : " green1c fw-500"
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
                  <InputBase
                    sx={{ ml: 1 }}
                    placeholder="Search Company"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
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
                      {companies
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row: Data) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
                              className="cursor-pointer"
                            >
                              <TableCell sx={{ py: 1, mx: 3 }}>
                                <Avatar
                                  className={"doctorcolor"}
                                  aria-label="recipe"
                                  sx={{ width: 37, height: 37 }}
                                  onClick={() => {
                                    setcompanyId(() => row.id);
                                  }}
                                >
                                  {row.name[0]}
                                </Avatar>
                              </TableCell>
                              <TableCell key="id" sx={{ p: 0 }}>
                                {row["name"]}
                              </TableCell>
                              <TableCell key="category/sector" sx={{ p: 0 }}>
                                {row["category"]}
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
                                <Link to={`/admin/companies/${row.id}`}>
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
                  count={companies.length}
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
