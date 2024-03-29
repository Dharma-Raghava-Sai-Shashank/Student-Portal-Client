import React, { useState } from "react";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { Header1 } from "../Headers/Header1";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Modal from "react-bootstrap/Modal";

import { fetchAllCourses } from "../../api/course.service";
import { fetchSpecializationForCourses } from "../../api/specialization.service";
import { fetchAllDepartments } from "../../api/department.service";
import { fetchCurrentAcadYear } from "../../api/acadYear.service";

const ITEM_HEIGHT = 70;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
interface department {
  deptId: number;
  deptName: string;
}
export const Programs = () => {
  const [courses, setCourses] = React.useState<any>([]);
  const [allDepartments, setAllDepartments] = useState<any>([]);
  const [allSpecialization, setAllSpecialization] = useState<any>([]);

  const [showNewCourse, setShowNewCourse] = useState(false);
  const [showNewDepartment, setShowNewDepartment] = useState(false);
  const [showNewDiscipline, setShowNewDiscipline] = useState(false);
  const [showNewSpecialization, setShowNewSpecialization] = useState(false);

  const handleCloseNewDepartment = () => setShowNewDepartment(false);
  const handleOpenNewDepartment = () => setShowNewDepartment(true);
  const handleCloseNewDiscipline = () => setShowNewDiscipline(false);
  const handleOpenNewDiscipline = () => setShowNewDiscipline(true);
  const handleCloseNewCourse = () => setShowNewCourse(false);
  const handleOpenNewCourse = () => setShowNewCourse(true);
  const handleCloseNewSpecialization = () => setShowNewSpecialization(false);
  const handleOpenNewSpecialization = () => setShowNewSpecialization(true);
  const [expandID, setExpandID] = useState<number | null>();
  const [courseModalName, setCourseModalName] = useState("");
  const [acadYear, setAcadYear] = React.useState<any>();
  const [openDept, setOpenDept] = useState<boolean>(false);
  const [openDisp, setOpenDisp] = useState<boolean>(false);

  const [selectedDepartment, setSelectedDepartment] = useState<department>();
  const [selectedDiscipline, setSelectedDiscipline] = useState<any>();

  // const handlecheckbox = (deptId: number) => {

  //   if (
  //     selected.find((dept) => {
  //       return dept.deptId === deptId;
  //     })
  //   )
  //     return true;
  //   return false;
  // };
  const handleAccordian = (id: any) => {
    if (expandID === id) setExpandID(() => null);
    else setExpandID(() => id);
  };

  // const handleChange = (event: any) => {
  //   console.log(event.target.value);
  //   setSelected(() => event.target.value);
  //   // const value = event.target.value;
  //   // if (
  //   //   selected.find((dept) => {
  //   //     return dept.deptId === value[0]?.deptId;
  //   //   })
  //   // ) {
  //   //   const newSelectedDept = selected.filter(
  //   //     (item) => item.deptId != value[0]?.deptId
  //   //   );
  //   //   setSelected(() => newSelectedDept);
  //   // } else {
  //   //   setSelected((prev) => [...prev, value[0]]);
  //   // }
  // };

  React.useEffect(() => {
    const fetchData = async () => {
      const { courses } = await fetchAllCourses();
      const response = await fetchCurrentAcadYear();

      setCourses(courses);
      setAcadYear(response?.acadYear);
      const { departments } = await fetchAllDepartments();
      setAllDepartments(departments);
      const { specializations } = await fetchSpecializationForCourses(
        courses?.map((course: any) => course.courseId),
        acadYear?.year
      );
      setAllSpecialization(specializations);
    };
    fetchData();
  }, [acadYear]);

  return (
    <div className="d-flex">
      <MainSidebar />
      <div className="w-100">
        <Header1 />
        <div className="d-flex justify-content-center">
          <div className=" w-100 px-5 py-5 grey2b">
            <div>
              <span className="fs-14">Admin | </span>
              <span className="fs-14 green1c fw-500">
                Programs - {acadYear?.year}
              </span>
            </div>
            <div className="bg-white my-2 shadow-lg ">
              <div className="d-flex justify-content-between border-bottom">
                <div className="fs-18 px-3 py-2 fw-500 my-2">All Programs</div>
              </div>
              {/* All courses */}

              <div>
                <div className=" px-3 py-2">
                  <div className="d-flex justify-content-between my-2">
                    <div className="mt-1">
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: "1rem" }}
                        gutterBottom
                      >
                        All Courses
                      </Typography>
                    </div>
                    <div className="ms-5">
                      <Button
                        sx={{ color: "#00ae57", fontSize: "12px" }}
                        startIcon={<AddIcon sx={{ fontSize: "8px" }} />}
                        onClick={handleOpenNewCourse}
                      >
                        Add New Course
                      </Button>
                      <Modal show={showNewCourse} onHide={handleCloseNewCourse}>
                        <Modal.Header closeButton>
                          <Modal.Title>Add New Course</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="my-3">
                            <label
                              htmlFor="CourseName"
                              className="newjobLabel fw-600"
                            >
                              Course Name
                            </label>
                            <input
                              type="text"
                              className="newjobInput"
                              id="CourseName"
                            />
                          </div>
                          <div className="my-3">
                            <label
                              htmlFor="CourseCode"
                              className="newjobLabel fw-600"
                            >
                              Course Duration (in years)
                            </label>
                            <input
                              type="number"
                              className="newjobInput"
                              id="CourseCode"
                            />
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={handleCloseNewCourse}>Close</Button>
                          <Button onClick={handleCloseNewCourse}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                  <hr style={{ height: "1.3px", margin: 0 }} />
                </div>
                <div className="pb-4 m-4">
                  {courses?.map((course: any) => (
                    <div className="w-75 m-3">
                      <Accordion
                        style={{ boxShadow: "none", padding: 0 }}
                        expanded={expandID === course.courseId}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon
                              onClick={() => handleAccordian(course.courseId)}
                            />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <div className="d-flex">
                            <div className="me-4">
                              <SchoolOutlinedIcon
                                sx={{
                                  mr: 1,
                                  color: "gray",
                                  fontSize: "30px",
                                }}
                              />
                            </div>
                            <Typography
                              variant="button"
                              sx={{
                                fontSize: "1rem",
                                letterSpacing: "0.1rem",
                                textTransform: "capitalize",
                              }}
                            >
                              {course.courseName + " (4 Years) "}
                            </Typography>
                            <div className="mx-3">
                              <IconButton color="primary" component="label">
                                <EditOutlinedIcon
                                  fontSize="small"
                                  color="success"
                                />
                              </IconButton>
                              <IconButton color="primary" component="label">
                                <DeleteOutlineOutlinedIcon
                                  fontSize="small"
                                  color="success"
                                />
                              </IconButton>
                              <Tooltip title="Add Discipline">
                                <IconButton
                                  color="primary"
                                  component="label"
                                  onClick={() => {
                                    handleOpenNewDiscipline();
                                    setCourseModalName(() => course.courseName);
                                  }}
                                >
                                  <AddCircleOutlineIcon
                                    fontSize="small"
                                    color="success"
                                  />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Add Specialization">
                                <IconButton
                                  color="primary"
                                  component="label"
                                  onClick={() => {
                                    handleOpenNewSpecialization();
                                    setCourseModalName(() => course.courseName);
                                  }}
                                >
                                  <AddToPhotosOutlinedIcon
                                    fontSize="small"
                                    color="success"
                                  />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {allSpecialization
                              ?.filter(
                                (specialization: any) =>
                                  specialization.courseId === course.courseId
                              )
                              .map((spec: any) => (
                                <div className=" mx-3 px-5" key={spec.specId}>
                                  <div className="d-flex">
                                    <div className="me-4">
                                      <CircleIcon
                                        sx={{
                                          color: "gray",
                                          fontSize: "18px",
                                          mt: 1,
                                          pt: 1,
                                        }}
                                      />
                                    </div>
                                    <div className="mt-2">
                                      <div className="">
                                        <Typography
                                          variant="button"
                                          sx={{
                                            fontSize: "1rem",
                                            letterSpacing: "0.1rem",
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {spec.specName}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div className="mx-3 mt-1">
                                      <IconButton
                                        color="primary"
                                        component="label"
                                      >
                                        <EditOutlinedIcon
                                          fontSize="small"
                                          color="success"
                                        />
                                      </IconButton>
                                      <IconButton
                                        color="primary"
                                        component="label"
                                      >
                                        <DeleteOutlineOutlinedIcon
                                          fontSize="small"
                                          color="success"
                                        />
                                      </IconButton>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                  <Modal
                    show={showNewSpecialization}
                    onHide={handleCloseNewSpecialization}
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Add New Specialization for
                        {" " + courseModalName}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="my-3">
                        <label
                          htmlFor="SpecializationName"
                          className="newjobLabel fw-600"
                        >
                          Specialization Name
                        </label>
                        <input
                          type="text"
                          className="newjobInput"
                          id="SpecializationName"
                        />
                        <div className="mt-3 mb-3 dropdownBody">
                          <label className="newjobLabel fw-600">
                            Select Discipline
                          </label>
                          <div className="dropdown my-3">
                            <div className="dropdown">
                              <button
                                type="button"
                                className="dropdown-toggle button-select"
                                onClick={() => {
                                  setOpenDisp((prev) => !prev);
                                }}
                              >
                                {!selectedDiscipline ||
                                selectedDiscipline?.deptName === ""
                                  ? "Select an Option"
                                  : selectedDiscipline?.deptName}
                              </button>

                              <ul
                                className={`dropdown-menu ${
                                  openDisp ? " show" : ""
                                }`}
                              >
                                {allDepartments.map((dept: department) => (
                                  <li className="dropdown-item">
                                    <button
                                      type="button"
                                      value={dept.deptName}
                                      className="dropdown-option"
                                      onClick={() => {
                                        setOpenDisp(() => false);
                                        setSelectedDiscipline(() => dept);
                                      }}
                                    >
                                      {dept.deptName}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleCloseNewSpecialization}>
                        Close
                      </Button>
                      <Button onClick={handleCloseNewSpecialization}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal
                    show={showNewDiscipline}
                    onHide={handleCloseNewDiscipline}
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Add New Discipline for
                        {" " + courseModalName}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="my-3">
                        <label
                          htmlFor="DisciplineName"
                          className="newjobLabel fw-600"
                        >
                          Discipline Name
                        </label>
                        <input
                          type="text"
                          className="newjobInput"
                          id="DisciplineName"
                        />
                        <div className="mt-3 mb-3 dropdownBody">
                          <label
                            htmlFor="Website"
                            className="newjobLabel fw-600"
                          >
                            Department
                          </label>
                          <div className="dropdown my-3">
                            <div className="dropdown">
                              <button
                                type="button"
                                className="dropdown-toggle button-select"
                                onClick={() => {
                                  setOpenDept((prev) => !prev);
                                }}
                              >
                                {!selectedDepartment ||
                                selectedDepartment?.deptName === ""
                                  ? "Select an Option"
                                  : selectedDepartment?.deptName}
                              </button>

                              <ul
                                className={`dropdown-menu ${
                                  openDept ? " show" : ""
                                }`}
                              >
                                {allDepartments.map((dept: department) => (
                                  <li className="dropdown-item">
                                    <button
                                      type="button"
                                      value={dept.deptName}
                                      className="dropdown-option"
                                      onClick={() => {
                                        setOpenDept(() => false);
                                        setSelectedDepartment(() => dept);
                                      }}
                                    >
                                      {dept.deptName}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleCloseNewDiscipline}>Close</Button>
                      <Button onClick={handleCloseNewDiscipline}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              {/* All departments */}
              <div>
                <div className=" px-3 py-2">
                  <div className="d-flex justify-content-between my-2">
                    <div className="mt-1">
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: "1rem" }}
                        gutterBottom
                      >
                        All Departments
                      </Typography>
                    </div>
                    <div className="ms-5">
                      <Button
                        sx={{ color: "#00ae57", fontSize: "12px" }}
                        startIcon={<AddIcon sx={{ fontSize: "8px" }} />}
                        onClick={handleOpenNewDepartment}
                      >
                        Add New Department
                      </Button>
                      <Modal
                        show={showNewDepartment}
                        onHide={handleCloseNewDepartment}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add New Department</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="my-3">
                            <label
                              htmlFor="DepartmentName"
                              className="newjobLabel fw-600"
                            >
                              Department Name
                            </label>
                            <input
                              type="text"
                              className="newjobInput"
                              id="DepartmentName"
                            />
                          </div>
                          <div className="my-3">
                            <label
                              htmlFor="DepartmentCode"
                              className="newjobLabel fw-600"
                            >
                              Department Code
                            </label>
                            <input
                              type="text"
                              className="newjobInput"
                              id="DepartmentCode"
                            />
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={handleCloseNewDepartment}>
                            Close
                          </Button>
                          <Button onClick={handleCloseNewDepartment}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                  <hr style={{ height: "1.3px", margin: 0 }} />
                </div>
                <div className="pb-4">
                  {allDepartments?.map((department: any) => (
                    <div className=" mx-3 px-5" key={department.deptId}>
                      <div className="d-flex my-2">
                        <div className="me-4">
                          <MapsHomeWorkOutlinedIcon
                            sx={{
                              mr: 1,
                              color: "gray",
                              fontSize: "30px",
                              mt: 1,
                            }}
                          />
                        </div>
                        <div className="mt-2">
                          <div className="">
                            <Typography
                              variant="button"
                              sx={{
                                fontSize: "1rem",
                                letterSpacing: "0.1rem",
                                textTransform: "capitalize",
                              }}
                            >
                              {department.deptName}
                            </Typography>
                          </div>
                        </div>
                        <div className="mx-3 mt-1">
                          <IconButton color="primary" component="label">
                            <EditOutlinedIcon
                              fontSize="small"
                              color="success"
                            />
                          </IconButton>
                          <IconButton color="primary" component="label">
                            <DeleteOutlineOutlinedIcon
                              fontSize="small"
                              color="success"
                            />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* All specializations */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
