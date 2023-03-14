import React, { useState } from "react";
import { uid } from "uid/single";
import { Category } from "../constants/category";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import { branches } from "../constants/branches";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import Popover from "@mui/material/Popover";
import AddIcon from "@mui/icons-material/Add";
import { ReactSortable } from "react-sortablejs";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./style.scss";

interface Schedule {
  id: string;
  StageName: string;
  StageMode: string;
  StageDate: string;
}

interface props {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  session: string;
  setSession: React.Dispatch<React.SetStateAction<string>>;
}

interface HeadCell {
  id: string;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "department",
    label: "Department",
  },
  {
    id: "branch",
    label: "Branch",
  },
];

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: "50%",
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export const NewJob = ({ option, setOption, session, setSession }: props) => {
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openCategoryOption, setOpenCategoryOption] = useState<string>("");

  const [openSchedule, setOpenSchedule] = useState<boolean>(false);
  const [ScheduleOption, setScheduleOption] = useState<string>("");

  const row = [0, 1, 2, 3, 4, 5, 6];
  const [show, setShow] = useState(false);

  const handleCloseCourse = () => setShow(false);
  const handleShowCourse = () => setShow(true);

  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const [ScheduleList, setScheduleList] = useState<Schedule[]>([]);
  const [stageName, setStageName] = useState("");
  const [stageMode, setStageMode] = useState("");
  const [stageDate, setStagedate] = useState("");

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChangeSkill = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = branches.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleAddStage = () => {
    setScheduleList((prevData) => [
      ...prevData,
      {
        id: uid(4),
        StageName: stageName,
        StageMode: stageMode,
        StageDate: stageDate,
      },
    ]);
    setStageName("");
    setStageMode("");
    setStagedate("");
    setScheduleOption("");
    console.log(ScheduleList);
  };
  // const handleStageInfo=(e:React.ChangeEventHandler)=>{
  //   setCurrentSchedule(()=>({...currentSchedule,[e.target.name]:: e.target.value}))
  // }

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const [sameCgpaChecked, setSameCgpaChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSameCgpaChecked(event.target.checked);
  };
  return (
    <div className="d-flex justify-content-center">
      <div className=" w-100 px-5 py-5 grey2b">
        <div>
          <span className="fs-14">Placement </span>
          <span
            className=" fs-14 cursor-pointer"
            onClick={() => setOption("Placement")}
          >
            | {session} |{" "}
          </span>
          <span className="green1c fs-14  fw-500 "> New Job </span>
        </div>
        <div className="bg-white my-2 shadow-lg ">
          <div className="d-flex justify-content-between border-bottom">
            <div className="fs-18 px-3 py-2 fw-500 my-2">Draft</div>
          </div>
          <div className="py-3 px-2 mx-4 mw-100">
            <form>
              {/* Company Details */}
              <div>
                <Divider>
                  <Chip label="COMPANY DETAILS" />
                </Divider>
                <div className="mb-3">
                  <label htmlFor="Company Name" className="newjobLabel">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="newjobInput"
                    id="Company Name"
                  />
                  {/* <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div> */}
                </div>

                <div className="mb-3">
                  <label htmlFor="Website" className="newjobLabel">
                    Website
                  </label>
                  <input type="text" className="newjobInput" id="Website" />
                </div>
                <div className="mb-3 dropdownBody">
                  <label htmlFor="Website" className="newjobLabel">
                    Category/ Sector
                  </label>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="dropdown-toggle button-select"
                      onClick={() => {
                        setOpenCategory((prev) => !prev);
                        // setOpenCategoryOption(() => "");
                      }}
                    >
                      {openCategoryOption === ""
                        ? "Select an Option"
                        : openCategoryOption}
                    </button>

                    <ul
                      className={`dropdown-menu ${openCategory ? " show" : ""}`}
                    >
                      {Category.map((item) => (
                        <li className="dropdown-item">
                          <button
                            type="button"
                            value={item}
                            className="dropdown-option"
                            onClick={() => {
                              setOpenCategory(() => false);
                              setOpenCategoryOption(() => item);
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Job Details */}
              <div>
                <div className="divider mt-5">
                  <Divider>
                    <Chip label="JOB DETAILS" />
                  </Divider>
                </div>

                <div className="mb-3">
                  <label htmlFor="Designation" className="newjobLabel">
                    Designation
                  </label>
                  <input type="text" className="newjobInput" id="Designation" />
                </div>
                <div className="mb-3">
                  <label htmlFor="Place of Posting" className="newjobLabel">
                    Place of Posting
                  </label>
                  <input
                    type="text"
                    className="newjobInput"
                    id="Place of Posting"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Job Descriptiong" className="newjobLabel">
                    Job Description
                  </label>
                  <textarea
                    // type="text"
                    rows={row[6]}
                    className="newjobInput"
                    id="Job Description"
                  />
                </div>
              </div>
              {/* Stipend Details */}
              <div>
                <div className="divider mt-5">
                  <Divider>
                    <Chip label="SALARY DETAILS" />
                  </Divider>
                </div>

                <div className="mb-3">
                  <label htmlFor="CTC" className="newjobLabel">
                    CTC (in lpa)
                  </label>
                  <input type="text" className="newjobInput" id="CTC" />
                </div>
                <div className="mb-3">
                  <label htmlFor="CTCbreakup" className="newjobLabel">
                    CTC breakup
                  </label>
                  <textarea
                    // type="text"
                    rows={row[4]}
                    className="newjobInput"
                    id="CTCbreakup"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="BondDetails" className="newjobLabel">
                    Bond Details
                  </label>
                  <textarea
                    // type="text"
                    rows={row[4]}
                    className="newjobInput"
                    id="BondDetails"
                  />
                </div>
              </div>
              {/* Course Details */}
              <div>
                <div className="divider mt-5">
                  <Divider>
                    <Chip label="ELIGIBILE COURSES" />
                  </Divider>
                </div>
                <div className="newJobCourses">
                  <Button
                    sx={{ color: "#00ae57", fontSize: "12px" }}
                    onClick={handleShowCourse}
                  >
                    <EditOutlinedIcon fontSize="small" sx={{ mx: 1 }} />
                    Add Courses and Disciplines
                  </Button>

                  <Modal size="xl" show={show} onHide={handleCloseCourse}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Eligible Courses and Disciplines
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="coursesModalBody">
                        <div className="row">
                          <div className="col-3 coursesNameBox">
                            <div className="courseButtonDiv border">
                              <button className="courseButton">
                                <div className="courseName"> B.Tech</div>
                                <div className="courseYear"> 4-years</div>
                              </button>
                            </div>
                            <div className="courseButtonDiv border">
                              <button className="courseButton">
                                <div className="courseName"> B.Tech</div>
                                <div className="courseYear"> 4-years</div>
                              </button>
                            </div>
                            <div className="courseButtonDiv border">
                              <button className="courseButton">
                                <div className="courseName"> B.Tech</div>
                                <div className="courseYear"> 4-years</div>
                              </button>
                            </div>
                            <div className="courseButtonDiv border">
                              <button className="courseButton">
                                <div className="courseName"> B.Tech</div>
                                <div className="courseYear"> 4-years</div>
                              </button>
                            </div>
                            <div className="courseButtonDiv border">
                              <button className="courseButton">
                                <div className="courseName"> B.Tech</div>
                                <div className="courseYear"> 4-years</div>
                              </button>
                            </div>
                          </div>
                          <div className="col-9 branchNameBox">
                            <Box sx={{ width: "100%" }}>
                              <Paper sx={{ width: "100%", mb: 2 }}>
                                {selected.length > 0 && (
                                  <Typography
                                    sx={{ flex: "1 1 100%" }}
                                    color="inherit"
                                    variant="subtitle1"
                                    component="div"
                                  >
                                    {selected.length} selected
                                  </Typography>
                                )}
                                <div className=" my-4">
                                  <div className="me-3">
                                    <Switch
                                      checked={sameCgpaChecked}
                                      onChange={handleChange}
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                    Same CGPA Cutoff for all branches
                                  </div>
                                  <div>
                                    {sameCgpaChecked && (
                                      <div className="mb-3 d-flex">
                                        <label
                                          htmlFor="Company Name"
                                          className="newjobLabel mx-3"
                                        >
                                          CGPA{" "}
                                        </label>
                                        <input
                                          type="number"
                                          className="newjobInput ms-3 w-25"
                                          id="cgpa"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <TableContainer>
                                  <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size="medium"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        {headCells.map((headCell) => (
                                          <TableCell
                                            key={headCell.id}
                                            align="left"
                                            padding="normal"
                                          >
                                            <Typography
                                              variant="button"
                                              display="block"
                                              gutterBottom
                                            >
                                              {headCell.label}
                                            </Typography>
                                          </TableCell>
                                        ))}
                                        {!sameCgpaChecked && (
                                          <TableCell
                                            key="cgpa"
                                            align="left"
                                            padding="normal"
                                          >
                                            <Typography
                                              variant="button"
                                              display="block"
                                              gutterBottom
                                            >
                                              CGPA Cutoff
                                            </Typography>
                                          </TableCell>
                                        )}

                                        <TableCell padding="checkbox">
                                          <div className="d-flex">
                                            <Checkbox
                                              color="primary"
                                              indeterminate={
                                                selected.length > 0 &&
                                                selected.length <
                                                  branches.length
                                              }
                                              checked={
                                                branches.length > 0 &&
                                                selected.length ===
                                                  branches.length
                                              }
                                              onChange={handleSelectAllClick}
                                              inputProps={{
                                                "aria-label": "select all",
                                              }}
                                              onMouseEnter={handlePopoverOpen}
                                              onMouseLeave={handlePopoverClose}
                                            />
                                            <Popover
                                              id="mouse-over-popover"
                                              sx={{
                                                pointerEvents: "none",
                                              }}
                                              open={open}
                                              anchorEl={anchorEl}
                                              anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                              }}
                                              transformOrigin={{
                                                vertical: "top",
                                                horizontal: "left",
                                              }}
                                              onClose={handlePopoverClose}
                                              disableRestoreFocus
                                            >
                                              <Typography sx={{ p: 1 }}>
                                                Select all branches
                                              </Typography>
                                            </Popover>
                                            {/* <small>Select all</small> */}
                                          </div>
                                          {/* Select all */}
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {branches.map((row, index) => {
                                        const isItemSelected = isSelected(row);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                          <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row}
                                            selected={isItemSelected}
                                          >
                                            <TableCell
                                              component="th"
                                              id={labelId}
                                              scope="row"
                                            >
                                              {row}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row}
                                            </TableCell>
                                            {!sameCgpaChecked && (
                                              <TableCell align="left">
                                                <TextField
                                                  id="standard-number"
                                                  label="CGPA(out of 10)"
                                                  type="number"
                                                  InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                  variant="standard"
                                                  disabled={!isItemSelected}
                                                />
                                              </TableCell>
                                            )}
                                            <TableCell padding="checkbox">
                                              <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                  "aria-labelledby": labelId,
                                                }}
                                                onClick={(event) =>
                                                  handleClick(event, row)
                                                }
                                              />
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Paper>
                            </Box>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleCloseCourse}>Close</Button>
                      <Button onClick={handleCloseCourse}>Save Changes</Button>
                    </Modal.Footer>
                  </Modal>

                  <div>
                    <div className="showSelectectedCourse ">
                      <div className="row showSelectectedCourseDegree">
                        <div className="col-2 degreeDiv pt-5">
                          <div className="">
                            <div className="">
                              <div className="DegreeName"> B.Tech</div>
                              <div className="DegreeYear"> 4-years</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-10 showSelectectedCourseBranch mt-3">
                          <Box sx={{ width: "100%" }}>
                            <Paper sx={{ width: "100%", mb: 2, p: 3 }}>
                              <div className="row  showSelectectedCourseHeading">
                                <div className="col-5">Department</div>
                                <div className="col-5">Branch</div>
                                <div className="col-2">CGPA Cutoff</div>
                              </div>
                              <div>
                                {branches.map((row, index) => (
                                  <div>
                                    <div className="row">
                                      <div className="col-5">{row}</div>
                                      <div className="col-5">{row}</div>
                                      <div className="col-2">8.5</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Paper>
                          </Box>
                        </div>
                      </div>
                      <div className="row showSelectectedCourseDegree">
                        <div className="col-2 degreeDiv pt-5">
                          <div className="">
                            <div className="">
                              <div className="DegreeName"> M.Tech</div>
                              <div className="DegreeYear"> 2-years</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-10 showSelectectedCourseBranch mt-3">
                          <Box sx={{ width: "100%" }}>
                            <Paper sx={{ width: "100%", mb: 2, p: 3 }}>
                              <div className="row  showSelectectedCourseHeading">
                                <div className="col-5">Department</div>
                                <div className="col-5">Branch</div>
                                <div className="col-2">CGPA Cutoff</div>
                              </div>
                              <div>
                                {branches.map((row, index) => (
                                  <div>
                                    <div className="row">
                                      <div className="col-5">{row}</div>
                                      <div className="col-5">{row}</div>
                                      <div className="col-2">8.0</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Paper>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Schedule Details */}
              <div className="newJobFlowchart">
                <div className="divider mt-5">
                  <Divider>
                    <Chip label="SCHEDULE" />
                  </Divider>
                </div>
                <div className="my-4">
                  <div>
                    <div className="row my-4">
                      <div className="col-3">
                        <div className="d-flex justify-content-center">
                          <div className="mb-3">
                            <label htmlFor="Stage" className="newjobLabel">
                              Stage Name
                            </label>
                            <input
                              type="text"
                              className="newjobInput"
                              id="Stage"
                              value={stageName}
                              onChange={(e) =>
                                setStageName(() => e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-3 ">
                        <div className="d-flex justify-content-center w-100">
                          <div
                            className="mb-3 dropdownBody"
                            style={{ height: "40px", width: "200px" }}
                          >
                            <label htmlFor="mode" className="newjobLabel">
                              Mode of Hiring
                            </label>
                            <div className="dropdown">
                              <button
                                type="button"
                                style={{
                                  height: "40px",
                                  width: "200px",
                                  lineHeight: "40px",
                                }}
                                className="dropdown-toggle button-select"
                                onClick={() => {
                                  setOpenSchedule((prev) => !prev);
                                  // setOpenCategoryOption(() => "");
                                }}
                              >
                                {ScheduleOption === ""
                                  ? "Select an Option"
                                  : ScheduleOption}
                              </button>

                              <ul
                                className={`dropdown-menu ${
                                  openSchedule ? " show" : ""
                                }`}
                              >
                                {[
                                  "Virtual",
                                  "Campus Visit",
                                  "Not Applicable",
                                ].map((item) => (
                                  <li className="dropdown-item">
                                    <button
                                      type="button"
                                      value={item}
                                      className="dropdown-option"
                                      onClick={() => {
                                        setOpenSchedule(() => false);
                                        setScheduleOption(() => item);
                                        setStageMode(() => item);
                                      }}
                                    >
                                      {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="d-flex justify-content-center">
                          <div className="mb-3">
                            <label htmlFor="DateStage" className="newjobLabel">
                              Tenatative Date
                            </label>
                            <input
                              type="date"
                              className="newjobInput"
                              id="DateStage"
                              value={stageDate}
                              onChange={(e) =>
                                setStagedate(() => e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="d-flex justify-content-center mt-4 pt-2">
                          <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleAddStage()}
                          >
                            ADD
                          </Button>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ReactSortable
                      list={ScheduleList}
                      setList={setScheduleList}
                      animation={250}
                      ghostClass="blue-background-class"
                    >
                      {ScheduleList.map((item, stage) => (
                        <div className="d-flex justify-content-center">
                          <div key={item.id} className="scrollSchedule">
                            <div>
                              <div>
                                <Typography
                                  variant="overline"
                                  display="block"
                                  // lineHeight="10px"
                                  align="center"
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  Stage {stage + 1}: {item.StageName}
                                </Typography>

                                <div className="d-flex justify-content-center">
                                  <div>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                    >
                                      Mode: {item.StageMode}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                    >
                                      Tentative Date: {item.StageDate}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ReactSortable>
                    {ScheduleList.length !== 0 && (
                      <div>
                        <Typography
                          variant="caption"
                          display="block"
                          align="right"
                        >
                          *Drag the box to change the order
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Skill based */}
              <div className="my-5">
                <Divider>
                  <Chip label="SKILL BASED HIRING" />
                </Divider>
                <div className="my-3">
                  <label htmlFor="Company Name" className="newjobLabel">
                    Skills
                  </label>
                  <div>
                    <FormControl sx={{ my: 3, width: "100%" }}>
                      <InputLabel>Select Skill</InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChangeSkill}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
