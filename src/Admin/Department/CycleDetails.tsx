import React from "react";
import { useParams } from "react-router";
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

import { Header1 } from "../Headers/Header1";
import { MainSidebar } from "../Sidebars/MainSidebar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { generateDetails } from "../Placement/ShowJob";
import { generateHeading } from "../Placement/ShowJob";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPlacementCycleById,
  savePlacementCycle,
  saveSpecializationForCycle,
} from "../../Slices/placementcycle";
import { getAllCourses } from "../../Slices/course";
import {
  getCourseIds,
  getData,
  handleCheckBoxClick,
  isAllSelected,
  isSelected,
  validateSelectedSpecsForCourses,
} from "../../helpers";
import { getSpecializationsByCourse } from "../../Slices/specialization";
import { fetchAcadYears } from "../../Slices/academicYear";
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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

const GraduatingYears = ["2023"];

const types = ["placement", "internship"];

export const CycleDetails = () => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const { cycleId } = useParams();
  const dispatch = useAppDispatch();

  const acadYears: AcademicYear.RootObject[] = useAppSelector((state) =>
    state.academicyear.currAcadYear
      ? [state.academicyear.currAcadYear, ...state.academicyear.prevAcadYears]
      : state.academicyear.prevAcadYears
  );

  const courses = useAppSelector((state) => state.course);
  const cycleSpecs = useAppSelector(
    (state) => state.placementcycle.specializations
  );
  const placementCycle = useAppSelector(
    (state) => state.placementcycle.currCycle
  );
  const specializations = useAppSelector((state) => state.specialization);

  const [courseIds, setCourseIds] = React.useState<number[]>([]);
  const [selectedCourseIds, setSelectedCourseIds] = React.useState<number[]>(
    []
  );
  const [specializationIds, setSpecializationIds] = React.useState<number[]>(
    []
  );
  const [selectedSpecIds, setSelectedSpecIds] = React.useState<number[]>([]);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [placementCycleData, setPlacementCycleData] =
    React.useState<PlacementCycle.RootObject>(
      placementCycle as PlacementCycle.RootObject
    );

  React.useEffect(() => {
    dispatch(getAllCourses());
    dispatch(
      getPlacementCycleById({ placementCycleId: parseInt(cycleId as string) })
    );
    dispatch(fetchAcadYears());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleId, dispatch]);

  React.useEffect(() => {
    setCourseIds(
      courses.map((course: Course.RootObject) => course.courseId as number)
    );
  }, [courses]);

  React.useEffect(() => {
    setSelectedCourseIds(getCourseIds(cycleSpecs));
    setSelectedSpecIds(
      cycleSpecs.map((spec: Specialization.Response) => spec.specId)
    );
  }, [cycleSpecs, isEditing]);

  React.useEffect(() => {
    if (selectedCourseIds.length > 0 && placementCycle)
      dispatch(
        getSpecializationsByCourse({
          courseIds: selectedCourseIds,
          acadYear: placementCycle?.acadYear?.year as string,
        })
      );
  }, [selectedCourseIds, placementCycle, dispatch]);

  React.useEffect(() => {
    setSpecializationIds(
      specializations.map((spec: Specialization.Response) => spec.specId)
    );
  }, [specializations]);

  React.useEffect(() => {
    setSelectedSpecIds((prevIds) =>
      validateSelectedSpecsForCourses(prevIds, specializationIds)
    );
  }, [specializationIds]);

  React.useEffect(() => {
    show
      ? setPlacementCycleData(placementCycle as PlacementCycle.RootObject)
      : dispatch(
          getPlacementCycleById({
            placementCycleId: parseInt(cycleId as string),
          })
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSaveSpecializations = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch(
      saveSpecializationForCycle({
        placementCycleId: parseInt(cycleId as string),
        specIds: selectedSpecIds,
      })
    );

    setIsEditing(false);
  };

  const handleEditing = () => setIsEditing(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlacementCycleData((prev: PlacementCycle.RootObject) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveCycle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(savePlacementCycle(placementCycleData));
    setShow(false);
  };

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
                            <Modal.Title>Add New Placement Cycle</Modal.Title>
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
                                name="placementCycleName"
                                value={placementCycleData?.placementCycleName}
                                onChange={handleOnChange}
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
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                              <Grid item xs={6}>
                                <InputLabel id="demo-simple-select-label">
                                  Academic Year
                                </InputLabel>
                                <Select
                                  fullWidth
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={
                                    placementCycleData?.acadYear
                                      ? placementCycleData?.acadYear.year
                                      : ""
                                  }
                                  label="Academic Year"
                                  onChange={(e: SelectChangeEvent) =>
                                    setPlacementCycleData(
                                      (prev: PlacementCycle.RootObject) => ({
                                        ...prev,
                                        acadYear: acadYears.find(
                                          (item) => item.year === e.target.value
                                        ),
                                      })
                                    )
                                  }
                                >
                                  {acadYears?.map(
                                    (item: AcademicYear.RootObject) => {
                                      return (
                                        <MenuItem
                                          value={item?.year}
                                          key={item?.year}
                                        >
                                          {item?.year}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </Select>
                              </Grid>
                              <Grid item xs={6}>
                                <InputLabel id="demo-simple-select-label">
                                  Graduating Year
                                </InputLabel>
                                <Select
                                  fullWidth
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={placementCycleData?.graduatingYear}
                                  label="Graduating Year"
                                  onChange={(e: SelectChangeEvent) =>
                                    setPlacementCycleData(
                                      (prev: PlacementCycle.RootObject) => ({
                                        ...prev,
                                        graduatingYear: e.target.value,
                                      })
                                    )
                                  }
                                >
                                  {GraduatingYears?.map((item: any) => {
                                    return (
                                      <MenuItem value={item} key={item}>
                                        {item}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </Grid>
                              <Grid item xs={12}>
                                <InputLabel id="demo-simple-select-label">
                                  Type
                                </InputLabel>
                                <Select
                                  fullWidth
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={placementCycleData?.type}
                                  label="Type"
                                  onChange={(e: SelectChangeEvent) =>
                                    setPlacementCycleData(
                                      (prev: PlacementCycle.RootObject) => ({
                                        ...prev,
                                        type: e.target.value,
                                      })
                                    )
                                  }
                                >
                                  {types?.map((item: any) => {
                                    return (
                                      <MenuItem value={item} key={item}>
                                        {item}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </Grid>
                            </Grid>

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
                                    name="startDate"
                                    value={placementCycleData?.startDate}
                                    onChange={handleOnChange}
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
                                    name="endDate"
                                    value={placementCycleData?.endDate}
                                    onChange={handleOnChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={handleSaveCycle}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                    <hr style={{ height: "1.3px", margin: 0 }} />
                    <div>
                      <div className="mt-2 mb-3">
                        {generateDetails("Cycle Name", placementCycle?.placementCycleName)}
                        {generateDetails(
                          "Graduating Year",
                          placementCycle?.graduatingYear
                        )}
                        {generateDetails("Type", placementCycle?.type)}
                        {generateDetails("Start Date", placementCycle?.startDate)}
                        {generateDetails("End Date", placementCycle?.endDate)}
                      </div>
                    </div>
                  </div>
                  {isEditing ? (
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
                                          selectedCourseIds.length > 0 &&
                                          selectedCourseIds.length <
                                            courses.length
                                        }
                                        checked={isAllSelected(
                                          selectedCourseIds,
                                          courseIds
                                        )}
                                        onChange={() =>
                                          setSelectedCourseIds(courseIds)
                                        }
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
                                {courseIds?.map((row: any, index: number) => {
                                  const isItemSelected = isSelected(
                                    selectedCourseIds,
                                    row
                                  )
                                    ? true
                                    : false;
                                  const labelId = row;
                                  const course = getData(
                                    row,
                                    "courseId",
                                    courses
                                  );

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
                                            handleCheckBoxClick(
                                              event,
                                              row,
                                              setSelectedCourseIds
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                      >
                                        {course.courseName}
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
                                          selectedSpecIds.length > 0 &&
                                          selectedSpecIds.length <
                                            specializations.length
                                        }
                                        checked={isAllSelected(
                                          selectedSpecIds,
                                          specializationIds
                                        )}
                                        onChange={() =>
                                          setSelectedSpecIds(specializationIds)
                                        }
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
                                {specializationIds.map(
                                  (row: any, index: number) => {
                                    const isItemSelected = isSelected(
                                      selectedSpecIds,
                                      row
                                    )
                                      ? true
                                      : false;
                                    const labelId = row;
                                    const specialization = getData(
                                      row,
                                      "specId",
                                      specializations
                                    );

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
                                              handleCheckBoxClick(
                                                event,
                                                row,
                                                setSelectedSpecIds
                                              )
                                            }
                                          />
                                        </TableCell>
                                        <TableCell
                                          component="th"
                                          id={labelId}
                                          scope="row"
                                        >
                                          {specialization?.courseName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {specialization?.specName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {specialization?.disciplineName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {specialization?.deptName}
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
                            setIsEditing(() => false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="outlined"
                          color="success"
                          className="mx-3 px-4"
                          onClick={handleSaveSpecializations}
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
                            onClick={handleEditing}
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
                              {selectedCourseIds?.map(
                                (row: any, index: number) => {
                                  const labelId = row;
                                  const course = getData(
                                    row,
                                    "courseId",
                                    courses
                                  );
                                  return (
                                    <TableRow tabIndex={-1} key={row}>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                      >
                                        {course?.courseName}
                                      </TableCell>
                                      <TableCell align="left">
                                        {course?.duration}
                                      </TableCell>
                                    </TableRow>
                                  );
                                }
                              )}
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
                                {selectedSpecIds?.map(
                                  (row: any, index: number) => {
                                    const labelId = row;
                                    const specialization = getData(
                                      row,
                                      "specId",
                                      cycleSpecs
                                    );

                                    return (
                                      <TableRow tabIndex={-1} key={row}>
                                        <TableCell
                                          component="th"
                                          id={labelId}
                                          scope="row"
                                        >
                                          {specialization?.courseName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {specialization?.specName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {specialization?.disciplineName}
                                        </TableCell>
                                        <TableCell align="left">
                                          {specialization?.deptName}
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
