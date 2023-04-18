import React, { useState } from "react";
// import { useParams } from "react-router";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Popover from "@mui/material/Popover";

import { fetchAllCourses } from "../../api/course.service";
import { fetchSpecializationForCourses } from "../../api/specialization.service";

import { Header1 } from "../Headers/Header1";
import { MainSidebar } from "../Sidebars/MainSidebar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { generateDetails } from "../Placement/ShowJob";
import { generateHeading } from "../Placement/ShowJob";
import { fetchCurrentAcadYear } from '../../api/acadYear.service';

interface HeadCell {
  id: string;
  label: string;
}
const cycle = {
  id: 1,
  name: "Full Time Placement (2023 batch)",
  startDate: "15 June 2022",
  endDate: "30 March 2023",
  type: "Placement",
  gradYear: 2023,
};
const headCells: readonly HeadCell[] = [
  {
    id: "course",
    label: "Course",
  },
  {
    id: "specialization",
    label: "Specialization",
  },

  {
    id: "discipline",
    label: "Discipline",
  },
  {
    id: "department",
    label: "Department",
  },
];
const headCoursesTable: readonly HeadCell[] = [
  {
    id: "course",
    label: "Course",
  },
  {
    id: "duration",
    label: "Duration",
  },
];

export const CycleDetails = () => {
  const [show, setShow] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] =
    React.useState<any>([]);
  const [selectedSpecializationID, setSelectedSpecializationID] =
    React.useState<number[] | null>([]);

  const [selectedCourses, setSelectedCourses] = React.useState<any>([]);
  const [selectedCoursesIds, setSelectedCoursesIds] = React.useState<number[]>(
    []
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [opentype, setOpentype] = useState<boolean>(false);
  const [opentypeOption, setOpentypeOption] = useState<string>("");

  // const params = useParams();
  // const cycleId = params.cycleId;

  const [courses, setCourses] = React.useState<any>([]);
  const [specializations, setSpecializations] = React.useState<any>([]);
  const [acadYear, setAcadYear] = React.useState<any>();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [editBranches, setEditBranches] = useState(false);

  // For Specialization
  const isSelectedSpecializtion = (id: number) =>
    selectedSpecialization.find((spec: any) => spec.specId === id);
  const handleClickSpecializtion = (
    event: React.ChangeEvent<HTMLInputElement>,
    spec: any
  ) => {
    if (event.target?.checked) {
      setSelectedSpecialization([...selectedSpecialization, spec]);
    } else
      setSelectedSpecialization(
        selectedSpecialization.filter(
          (item: any) => item.specId !== spec.specId
        )
      );
    setSelectedSpecializationID(
      selectedSpecialization?.map((item: any) => item.specId)
    );
  };
  const isAllSelectedSpecialization = () => {
    for (let i in specializations)
      if (
        !selectedSpecialization.find(
          (spec: any) => spec.specId === specializations[i]?.specId
        )
      )
        return false;
    return true;
  };
  const handleSelectAllSpecialization = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const newList = Array.from(
        new Set([...selectedSpecialization, ...specializations])
      );
      setSelectedSpecialization(newList as any);
      return;
    } else
      setSelectedSpecialization(
        selectedSpecialization.filter(
          (spec: any) =>
            !specializations.find((item: any) => spec.specId === item.specId)
        )
      );
    setSelectedSpecializationID(
      selectedSpecialization?.map((item: any) => item.specId)
    );
  };

  // For Courses
  const isSelectedCourses = (id: number) =>
    selectedCourses.find((course: any) => course.courseId === id);

  const handleClickCourses = (
    event: React.ChangeEvent<HTMLInputElement>,
    course: any
  ) => {
    if (event.target?.checked) {
      setSelectedCourses([...selectedCourses, course]);
    } else
      setSelectedCourses(
        selectedCourses.filter((item: any) => item.courseId !== course.courseId)
      );
    setSelectedCoursesIds(selectedCourses.map((item: any) => item.courseId));
  };
  const isAllSelectedCourses = () => {
    for (let i in courses)
      if (
        !selectedCourses.find(
          (course: any) => course.courseId === courses[i]?.courseId
        )
      )
        return false;
    return true;
  };
  const handleSelectAllCourses = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const newList = Array.from(new Set([...selectedCourses, ...courses]));
      setSelectedCourses(newList as any);
      return;
    } else
      setSelectedCourses(
        selectedCourses.filter(
          (course: any) =>
            !courses.find((item: any) => course.courseId === item.courseId)
        )
      );
    setSelectedCoursesIds(selectedCourses.map((item: any) => item.courseId));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const { courses } = await fetchAllCourses();
      const response = await fetchCurrentAcadYear();

      setCourses(courses);
      setAcadYear(response?.acadYear);
      // setCurrCourse(courses?.[0]?.courseId);
      setSelectedCoursesIds(
        selectedCourses.map((course: any) => course.courseId)
      );
    };
    fetchData();
    // setIsUploading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const fetchSpecialization = async () => {
      const { specializations } = await fetchSpecializationForCourses(
        selectedCoursesIds, acadYear?.year
      );

      setSpecializations(specializations);
    };
    if (selectedCoursesIds && selectedCoursesIds.length) fetchSpecialization();
  }, [selectedCoursesIds, acadYear]);
  //     const { specializations } = await fetchSpecializationForCourses(currCourses, acadYear?.year);

  //     setSpecializations(specializations);
  //   };
  //   if (currCourses && currCourses.length && acadYear) fetchSpecialization();
  // }, [currCourses, acadYear]);

  return (
    <div>
      <div className="d-flex">
        <MainSidebar />
        <div className="w-100">
          <Header1 />
          <div className="d-flex justify-content-center w-100">
            <div className="w-100 px-5 py-5 grey2b">
              <div>
                <span className=" fs-14">Admin </span>
                <span className=" fs-14">| Placement Cycle </span>
                <span className="green1c fw-500 fs-14">| Cycle-Name </span>
              </div>
              <div className="bg-white my-2 shadow-lg position-relative">
                <div>
                  <div className="mx-5 mt-2 mb-5 pt-4 ">
                    <div className="d-flex justify-content-between my-2">
                      <div className="mt-1">
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "1rem" }}
                          gutterBottom
                        >
                          Cycle Details
                        </Typography>
                      </div>
                      <div className="ms-5">
                        <Button
                          sx={{ color: "#00ae57", fontSize: "12px" }}
                          startIcon={
                            <EditOutlinedIcon sx={{ fontSize: "8px" }} />
                          }
                          onClick={handleShow}
                        >
                          Edit
                        </Button>
                        <Modal show={show} onHide={handleClose} size="lg">
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Placement Cycle</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="my-3">
                              <label
                                htmlFor="Cycle Name"
                                className="newjobLabel fw-600"
                              >
                                Cycle Name
                              </label>
                              <input
                                type="text"
                                className="newjobInput"
                                id="Cycle Name"
                              />
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{ color: "color: rgba(0, 0, 0, 0.6)" }}
                              >
                                Kindly mention start and end month too (Ex: May
                                – July 2022 Pre-final year students of ALL
                                courses)
                              </Typography>
                            </div>
                            <div className="my-3">
                              <label
                                htmlFor="Cycle Name"
                                className="newjobLabel fw-600"
                              >
                                Graduating Year
                              </label>
                              <input
                                type="number"
                                className="newjobInput"
                                id="Cycle Name"
                              />
                            </div>
                            <div className="mb-3 dropdownBody">
                              <label
                                htmlFor="Website"
                                className="newjobLabel fw-600"
                              >
                                Type
                              </label>
                              <div className="dropdown">
                                <button
                                  type="button"
                                  className="dropdown-toggle button-select"
                                  onClick={() => {
                                    setOpentype((prev) => !prev);
                                  }}
                                >
                                  {opentypeOption === ""
                                    ? "Select an Option"
                                    : opentypeOption}
                                </button>

                                <ul
                                  className={`dropdown-menu ${
                                    opentype ? " show" : ""
                                  }`}
                                >
                                  {["Full Time", "Internship"].map((item) => (
                                    <li className="dropdown-item">
                                      <button
                                        type="button"
                                        value={item}
                                        className="dropdown-option"
                                        onClick={() => {
                                          setOpentype(() => false);
                                          setOpentypeOption(() => item);
                                        }}
                                      >
                                        {item}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <div className="row">
                                <div className="col-6 px-3">
                                  <label
                                    htmlFor="StartDate"
                                    className="newjobLabel fw-600"
                                  >
                                    Start Date
                                  </label>
                                  <input
                                    type="date"
                                    className="newjobInput"
                                    id="StartDate"
                                  />
                                </div>
                                <div className="col-6">
                                  <label
                                    htmlFor="EndDate"
                                    className="newjobLabel fw-600"
                                  >
                                    End Date
                                  </label>
                                  <input
                                    type="date"
                                    className="newjobInput"
                                    id="EndDate"
                                  />
                                </div>
                              </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={handleClose}>Save Changes</Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                    <hr style={{ height: "1.3px", margin: 0 }} />
                    <div>
                      <div className="mt-2 mb-3">
                        {generateDetails("Cycle Name", cycle.name)}
                        {generateDetails(
                          "Graduating Year",
                          cycle.gradYear.toString()
                        )}
                        {generateDetails("Type", cycle.type)}
                        {generateDetails("Start Date", cycle.startDate)}
                        {generateDetails("End Date", cycle.endDate)}
                      </div>
                    </div>
                  </div>
                  {editBranches ? (
                    <div>
                      <div className="mx-5 mt-2 mb-5">
                        {generateHeading("Select Eligible Degrees")}
                        <div className="my-3">
                          <TableContainer>
                            <Table
                              sx={{ minWidth: 750 }}
                              aria-labelledby="tableTitle"
                              size="medium"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell padding="checkbox">
                                    <div className="d-flex">
                                      <Checkbox
                                        color="primary"
                                        indeterminate={
                                          selectedCourses.length > 0 &&
                                          selectedCourses.length <
                                            courses.length
                                        }
                                        checked={isAllSelectedCourses()}
                                        onChange={handleSelectAllCourses}
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
                                          Select all
                                        </Typography>
                                      </Popover>
                                    </div>
                                  </TableCell>
                                  {headCoursesTable.map((headCell) => (
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
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {/* <>{console.log(courses)}</> */}
                                {courses?.map((row: any, index: number) => {
                                  const isItemSelected = isSelectedCourses(
                                    row.courseId
                                  )
                                    ? true
                                    : false;
                                  const labelId = row.courseId;

                                  return (
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.courseId}
                                      selected={isItemSelected}
                                    >
                                      <TableCell padding="checkbox">
                                        <Checkbox
                                          color="primary"
                                          checked={isItemSelected}
                                          inputProps={{
                                            "aria-labelledby": labelId,
                                          }}
                                          onChange={(event) =>
                                            handleClickCourses(event, row)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                      >
                                        {row.courseName}
                                      </TableCell>
                                      <TableCell align="left">2019</TableCell>
                                      <TableCell align="left">2023</TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                        {/* <>{console.log(selectedCourses)}</> */}
                      </div>

                      <div className="mx-5 mt-2 mb-5">
                        {generateHeading("Select Eligible Specialization")}
                        <div className="my-3">
                          <TableContainer>
                            <Table
                              sx={{ minWidth: 750 }}
                              aria-labelledby="tableTitle"
                              size="medium"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell padding="checkbox">
                                    <div className="d-flex">
                                      <Checkbox
                                        color="primary"
                                        indeterminate={
                                          selectedSpecialization.length > 0 &&
                                          selectedSpecialization.length <
                                            specializations.length
                                        }
                                        checked={isAllSelectedSpecialization()}
                                        onChange={handleSelectAllSpecialization}
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
                                          Select all
                                        </Typography>
                                      </Popover>
                                    </div>
                                  </TableCell>
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
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {specializations.map(
                                  (row: any, index: number) => {
                                    const isItemSelected =
                                      isSelectedSpecializtion(row.specId)
                                        ? true
                                        : false;
                                    const labelId = row.specId;

                                    return (
                                      <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.specId}
                                        selected={isItemSelected}
                                      >
                                        <TableCell padding="checkbox">
                                          <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                              "aria-labelledby": labelId,
                                            }}
                                            onChange={(event) =>
                                              handleClickSpecializtion(
                                                event,
                                                row
                                              )
                                            }
                                          />
                                        </TableCell>
                                        <TableCell
                                          component="th"
                                          id={labelId}
                                          scope="row"
                                        >
                                          {row.courseName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row.specName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row.disciplineName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row.departmentName}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  }
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </div>
                      <div className="mx-5 mt-2 mb-5 d-flex justify-content-center pb-5">
                        <Button
                          variant="outlined"
                          className="mx-3 px-4"
                          color="error"
                          onClick={() => {
                            setEditBranches(() => false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="outlined"
                          color="success"
                          className="mx-3 px-4"
                          onClick={() => {
                            setEditBranches(() => true);
                          }}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mx-5 mt-2 mb-5 pb-5">
                      <div className="d-flex justify-content-between my-2">
                        <div className="mt-1">
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "1rem" }}
                            gutterBottom
                          >
                            All Selected Courses and Specializations
                          </Typography>
                        </div>
                        <div className="ms-5">
                          <Button
                            sx={{ color: "#00ae57", fontSize: "12px" }}
                            startIcon={
                              <EditOutlinedIcon sx={{ fontSize: "8px" }} />
                            }
                            onClick={() => {
                              setEditBranches(() => true);
                            }}
                          >
                            Edit Selected Courses
                          </Button>
                        </div>
                      </div>
                      <hr style={{ height: "1.3px", margin: 0 }} />

                      <div className="mt-3 mb-5">
                        <TableContainer>
                          <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size="medium"
                          >
                            <TableHead>
                              <TableRow>
                                {headCoursesTable.map((headCell) => (
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
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {courses?.map((row: any, index: number) => {
                                const labelId = row.courseId;
                                return (
                                  <TableRow tabIndex={-1} key={row.courseId}>
                                    <TableCell
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                    >
                                      {row.courseName}
                                    </TableCell>
                                    <TableCell align="left">4 Years</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                      <div className="mt-3 mb-5">
                        <div className="my-3">
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
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {specializations?.map(
                                  (row: any, index: number) => {
                                    const labelId = row.specId;

                                    return (
                                      <TableRow tabIndex={-1} key={row.specId}>
                                        <TableCell
                                          component="th"
                                          id={labelId}
                                          scope="row"
                                        >
                                          {row.courseName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row.specName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row.disciplineName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row.departmentName}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  }
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
