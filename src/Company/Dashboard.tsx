import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CompanyHeader from "./CompanyHeader";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Modal from "react-bootstrap/Modal";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPlacementCycles, savePlacementCycle } from "../Slices/placementcycle";
import { ADMIN } from "../Admin/constants";
import { NFTableShow } from "../Admin/Placement/NFTableShow";
import { NewJob } from "../Company/NewJob";
import { fetchAcadYears } from "../Slices/academicYear";
import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const initialData: PlacementCycle.RootObject = {
  placementCycleName: "",
  type: "",
  acadYear: undefined,
  startDate: "",
  endDate: "",
  graduatingYear: "",
};


const data = [
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd June, 2022",
    profile: "Business Analayst",
    status: "Submitted",
  },
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd November, 2022",
    profile: "Software Eng",
    status: "Edit",
  },
  {
    id: 1,
    cycle: "June-July 2 Month 2024 batch",
    date: "12nd August, 2022",
    profile: "Software Develoer",
    status: "Submitted",
  },
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd June, 2022",
    profile: "Business Analayst",
    status: "Submitted",
  },
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd November, 2022",
    profile: "Software Eng",
    status: "Edit",
  },
  {
    id: 1,
    cycle: "June-July 2 Month 2024 batch",
    date: "12nd August, 2022",
    profile: "Software Develoer",
    status: "Submitted",
  },
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd June, 2022",
    profile: "Business Analayst",
    status: "Submitted",
  },
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd November, 2022",
    profile: "Software Eng",
    status: "Edit",
  },
  {
    id: 1,
    cycle: "June-July 2 Month 2024 batch",
    date: "12nd August, 2022",
    profile: "Software Develoer",
    status: "Submitted",
  },
];

export const Dashboard = () => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const [showNewJob, setShowNewJob] = useState(false);

  const handleShow = () => {
    setShowNewJob(!showNewJob);
  };

  const [show, setShow] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const dispatch = useAppDispatch();
  const types = ["placement", "internship"];
  const initialData: PlacementCycle.RootObject = {
    placementCycleName: "",
    type: "",
    acadYear: undefined,
    startDate: "",
    endDate: "",
    graduatingYear: "",
  };

  const GraduatingYears = ["2023"];

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [placementCycle, setPlacementCycle] =
    useState<PlacementCycle.RootObject>(initialData);

  const acadYears: AcademicYear.RootObject[] = useAppSelector((state) =>
    state.academicyear.currAcadYear
      ? [state.academicyear.currAcadYear, ...state.academicyear.prevAcadYears]
      : state.academicyear.prevAcadYears
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlacementCycle((prev: PlacementCycle.RootObject) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const data2={
  "success": true,
  "jobs": [
    {
      "nfId": 1,
      "type": "JNF",
      "profile": "MS SDE",
      "placeOfPosting": "Bangalore",
      "jobDescription": "Good job",
      "modeOfInternship": "NA",
      "ctc": "45LPA",
      "ctcBreakup": "45LPA",
      "bondDetails": "NA",
      "hasPPO": "0",
      "ismOffersMin": 2,
      "ismOffersMax": 20,
      "cdcInformation": "Nope",
      "additionalDetails": "NA",
      "status": "Finalized",
      "deadline": "2023-07-01T18:29:59.000Z",
      "createdAt": "2023-03-18T15:07:45.000Z",
      "updatedAt": "2023-03-18T15:07:47.000Z",
      "deletedAt": null,
      "is_eligible": 1,
      "is_applied": 1,
      "is_open": 1
    },
    {
      "nfId": 2,
      "type": "JNF",
      "profile": "Goog SDE",
      "placeOfPosting": "Hyderabad",
      "jobDescription": "Awesome job",
      "modeOfInternship": "NA",
      "ctc": "50LPA",
      "ctcBreakup": "50LPA",
      "bondDetails": "NA",
      "hasPPO": "0",
      "ismOffersMin": 3,
      "ismOffersMax": 7,
      "cdcInformation": "Nope",
      "additionalDetails": "NA",
      "status": "Draft",
      "deadline": "2023-04-01T18:29:59.000Z",
      "createdAt": "2023-03-18T15:07:45.000Z",
      "updatedAt": "2023-03-18T15:07:47.000Z",
      "deletedAt": null,
      "is_eligible": 0,
      "is_applied": 1,
      "is_open": 0
    },
    {
      "nfId": 3,
      "type": "JNF",
      "profile": "Texas Elec",
      "placeOfPosting": "Noida",
      "jobDescription": "Fantastic job",
      "modeOfInternship": "NA",
      "ctc": "55LPA",
      "ctcBreakup": "55LPA",
      "bondDetails": "NA",
      "hasPPO": "0",
      "ismOffersMin": 4,
      "ismOffersMax": 4,
      "cdcInformation": "Nope",
      "additionalDetails": "NA",
      "status": "Draft",
      "deadline": "2023-04-01T18:29:59.000Z",
      "createdAt": "2023-03-18T15:07:45.000Z",
      "updatedAt": "2023-03-18T15:07:47.000Z",
      "deletedAt": null,
      "is_eligible": 0,
      "is_applied": 0,
      "is_open": 0
    },
    {
      "nfId": 8,
      "type": "INF",
      "profile": "Data Analyst",
      "placeOfPosting": "Bengaluru",
      "jobDescription": "Worth it",
      "modeOfInternship": "NA",
      "ctc": "23LPA",
      "ctcBreakup": "23LPA",
      "bondDetails": "1 year",
      "hasPPO": "1",
      "ismOffersMin": 1,
      "ismOffersMax": 3,
      "cdcInformation": "Nope",
      "additionalDetails": "NA",
      "status": "Draft",
      "deadline": "2023-03-21T12:38:09.000Z",
      "createdAt": "2023-03-19T12:38:08.000Z",
      "updatedAt": "2023-03-19T12:38:08.000Z",
      "deletedAt": null,
      "is_eligible": 0,
      "is_applied": 0,
      "is_open": 0
    },
    {
      "nfId": 49,
      "type": "INF",
      "profile": "Business Analyst",
      "placeOfPosting": "Gurgaon",
      "jobDescription": "NA",
      "modeOfInternship": "NA",
      "ctc": "10LPA",
      "ctcBreakup": "NA",
      "bondDetails": "NA",
      "hasPPO": "0",
      "ismOffersMin": 3,
      "ismOffersMax": 5,
      "cdcInformation": "Nope",
      "additionalDetails": "<p>NA</p>",
      "status": "Draft",
      "deadline": "2023-03-31T11:05:44.000Z",
      "createdAt": "2023-03-29T11:05:44.000Z",
      "updatedAt": "2023-03-29T11:05:44.000Z",
      "deletedAt": null,
      "is_eligible": 1,
      "is_applied": 0,
      "is_open": 0
    }
  ]
}
  const cycles = useAppSelector((state) => state.placementcycle);

  React.useEffect(() => {
    dispatch(fetchPlacementCycles({ type: ADMIN }));
    dispatch(fetchAcadYears());
  }, [dispatch]);

  const handleSaveCycle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(savePlacementCycle(placementCycle));
    setShow(false);
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
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#dddddd71",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));



  const [option, setOption] = useState<string>("Placement");
  const [session, setSession] = useState<string>("Full Time Hiring 2023-24");

  fetch('http://localhost:3000/company/dashboard').then(res => {
    res.json()
  })

  return (
    <div>
      <CompanyHeader />
      <div className="p-5 blue1b mh-100" style={{ marginTop: "5rem" }}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Dashboard</Typography>
          </Breadcrumbs>
        </div>
        <div className="my-1">
          <div className=" p-5 bg-white">
            <div className="d-flex justify-content-center my-3">
              <Button
                variant="contained"
                sx={{ backgroundColor: "#1f385b", px: 2, py: 1 }}
                onClick={handleShow}
              >
                Fill a new Application
              </Button>
            </div>
            {showNewJob && (
              <NewJob
                option={option}
                setOption={setOption}
                session={session}
                setSession={setSession}
              />
            )}
            <div className="d-flex justify-content-center my-5 mx-3 px-3">
              <Paper
                sx={{
                  width: "100%",
                  boxShadow: "none",
                  border: "0.1px dotted gray",
                }}
              >
                <TableContainer>
                  <Table aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={2} className="p-0 mx-2 mb-2">
                          <TextField
                            id="standard-basic"
                            label="Search an Application"
                            variant="standard"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell colSpan={1} className="p-1">
                          <Button variant="text">Sort</Button>
                        </TableCell>
                        <TableCell colSpan={1} className="p-1">
                          <Button variant="text">Filter</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell key="cycle">CTC</TableCell>
                        <TableCell key="profile">Profile</TableCell>
                        <TableCell key="Date">Date</TableCell>
                        <TableCell key="Status">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data2.jobs
                        .map((nf) => {
                          return (
                            <StyledTableRow key={nf.nfId}>
                              <TableCell>{nf.ctc}</TableCell>
                              <TableCell>{nf.profile}</TableCell>
                              <TableCell>{nf.createdAt}</TableCell>
                              <TableCell>{nf.status}</TableCell>
                            </StyledTableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={data.length}
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
