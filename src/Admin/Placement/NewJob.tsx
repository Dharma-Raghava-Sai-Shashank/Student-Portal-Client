import React, { useEffect, useRef, useState } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import Popover from "@mui/material/Popover";
import AddIcon from "@mui/icons-material/Add";
import { ReactSortable } from "react-sortablejs";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ReactQuill from "react-quill";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "react-quill/dist/quill.snow.css";
import { skills } from "../constants/skills";
import "./style.scss";
import {
  createHR,
  createJob,
  fetchAllCategories,
  fetchAllCourses,
  fetchAllScpts,
  fetchAllStages,
  fetchSpecializationForCourses,
  uploadFile,
} from "../../api";

interface Schedule {
  id: string;
  stage: any;
  stageType: string;
  stageMode: string;
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
    id: "discipline",
    label: "Discipline",
  },
  {
    id: "specialization",
    label: "Specialization",
  },
];

// const ITEM_HEIGHT = 80;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       // width: "50%",
//     },
//   },
// };

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

const currencies = ["+91", "+87", "+71"];

const modules = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ["bold", "italic", "underline"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
};
const initialJobData = {
  type: "INF",
  profile: "Business Analyst",
  placeOfPosting: "Gurgaon",
  jobDescription: "NA",
  modeOfInternship: "NA",
  ctc: "10LPA",
  ctcBreakup: "NA",
  bondDetails: "NA",
  hasPPO: 0,
  ismOffersMax: 5,
  ismOffersMin: 3,
  company:  {
    companyName: "",
    companyWebsite: "",
    category: {},
},
  nfEligibility: [],
  nf_stages: [],
  nfHistoryCriteria: [],
  nf_docs: [],
  placementCycle: {
    placementCycleId: 4,
    placementCycleName: 'FT Cycle 2022-23',
    acadYear: '2022-2023'
  },
  HRs: [],
  spocs: [],
  additionalDetails: "NA",
};
// const initialJobData = {
//   type: "",
//   profile: "",
//   placeOfPosting: "",
//   jobDescription: "",
//   modeOfInternship: "",
//   ctc: "",
//   ctcBreakup: "",
//   bondDetails: "",
//   hasPPO: "",
//   ismOffersMax: "",
//   ismOffersMin: "",
//   company: {
//     companyName: "",
//     companyWebsite: "",
//     category: {},
//     sector: {},
//   },
//   nfEligibilty: [],
//   nf_stages: [],
//   nfHistoryCriteria: [],
//   nf_docs: [],
//   placementCycle: {},
//   HRs: [],
//   spocs: [],
//   additionalDetails: "",
// };

const initialHRData = {
  name: "",
  emails: [],
  phones: [
    {
      phonePref: "+91",
      phone: "",
    },
  ],
  linkedin: "",
};

const initialStageData = {
  stage: 0,
  stageType: '',
  stageMode: ''
}

interface StageData {
  stage: number,
  stageType: string,
  stageMode: string
}

export const NewJob = ({ option, setOption, session, setSession }: props) => {
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openCategoryOption, setOpenCategoryOption] = useState<number>(0);
  const [openSchedule, setOpenSchedule] = useState<string>("None");
  const [ScheduleOption, setScheduleOption] = useState<string>("");
  const row = [0, 1, 2, 3, 4, 5, 6];
  const [show, setShow] = useState(false);
  const [selected, setSelected] = React.useState<any>([]);
  const [ScheduleList, setScheduleList] = useState<Schedule[]>([]);
  const [stageData, setStageData] = useState<StageData>(initialStageData);
  const [uploadedDocs, setUploadedDocs] = useState<any>([]);
  const [secondaryHR, setSecondaryHR] = useState(false);
  const [primaryspoc, setPrimaryspoc] = React.useState("");
  const [secondaryspoc, setsecondaryspoc] = React.useState("");
  const [jobData, setJobData] = React.useState(initialJobData);
  const [categories, setCategories] = React.useState<any>([]);
  const [courses, setCourses] = React.useState<any>([]);
  const [specializations, setSpecializations] = React.useState<any>([]);
  const [currCourse, setCurrCourse] = React.useState<number>(0);
  const [scpts, setScpts] = React.useState<any>([]);
  const [primaryHr, setPrimaryHr] = React.useState<any>(initialHRData);
  const [secondaryHr, setSecondaryHr] = React.useState<any>(initialHRData);
  const [selectionStages, setSelectionStages] = React.useState<any>([]);
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  const formData = new FormData();

  const handleCloseCourse = () => setShow(false);
  const handleShowCourse = () => setShow(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const { categories } = await fetchAllCategories();
      const { courses } = await fetchAllCourses();
      const { scpts } = await fetchAllScpts();
      const { stages } = await fetchAllStages();

      setCategories(categories);
      setCourses(courses);
      setCurrCourse(courses?.[0]?.courseId);
      setScpts(scpts);
      setSelectionStages(stages);
    };
    fetchData();
  setIsUploading(false);

  }, []);

  React.useEffect(() => {
    const fetchSpecialization = async () => {
      const { specializations } = await fetchSpecializationForCourses(
        currCourse
      );

      setSpecializations(specializations);
    };
    if (currCourse && currCourse !== 0) fetchSpecialization();
  }, [currCourse]);

  // const handleChangeSkill = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

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
        stage: selectionStages.find((stage: any) => stage.stageId === stageData.stage),
        stageType: stageData.stageType,
        stageMode: stageData.stageMode,
      },
    ]);
    setStageData(initialStageData);
    setScheduleOption("");
  };

  const open = Boolean(anchorEl);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newList = Array.from(new Set([...selected, ...specializations]));
      setSelected(newList as any);
      return;
    } else setSelected(selected.filter((spec: any) => !specializations.find((item: any) => spec.specId === item.specId)));
  };

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    spec: any
  ) => {
    if (event.target?.checked) {
      setSelected([...selected, spec]);
    } else setSelected(selected.filter((item: any) => item.specId !== spec.specId));
  };

  const isSelected = (id: number) => selected.find((spec: any) => spec.specId === id);
  const isAllSelected = () => {
    for (let i in specializations)
      if (!selected.find((spec: any) => spec.specId === specializations[i]?.specId)) return false;
    return true;
  };
  const [sameCgpaChecked, setSameCgpaChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSameCgpaChecked(event.target.checked);
  };

  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const uploadFiles = async (files: any) => {
    for(let i in files){
      formData.set("file",files[i]);
      files[i] = await uploadFile(formData);
    }
    return files;
  }

  const handleUploadClick = async (e: any) => {
    e.preventDefault();
    if (!fileList) {
      return;
    }
    setIsUploading((prev) => !prev);
    setUploadedDocs([]);
    const docs = await uploadFiles(Array.from(fileList));
    setUploadedDocs(docs.map((doc:any) => ({ docType: 'JNF', document: doc.document })));
    setIsUploading((prev) => !prev);
  };
  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

  const assembleJobData = async () => {
    const spocs: any = [];
    spocs.push({
      scpt: scpts.find((scpt: any) => scpt.scptId === primaryspoc),
      isPrimary: 1,
    });
    spocs.push({
      scpt: scpts.find((scpt: any) => scpt.scptId === secondaryspoc),
      isPrimary: 0,
    });

    const HRs: any = [];
    const primary = await createHR(primaryHr);
    const secondary = await createHR(secondaryHr);
    HRs.push({ isPrimary: 1, hr: primary?.HR});
    HRs.push({ isPrimary: 0, hr: secondary?.HR});

    setJobData((prevData: any) => ({ ...prevData, nf_docs: uploadedDocs, spocs, HRs, nf_stages: ScheduleList as any, nfEligibility: selected.map((spec: any) => {
      return {
        spec,
        minLPA: 10,
        maxLPA: 30,
        cgpaValue: 7.5
      }
    }) as any}));

    const nfEligibility: any = [];
    for(let i in selected)
    {
      nfEligibility.push({
        spec: selected[i],
        minLPA: 10,
        maxLPA: 30,
        cgpaValue: 7.5
      })
    }

    return {
      ...jobData,
      nf_docs: [...uploadedDocs],
      spocs,
      HRs,
      nf_stages: [...ScheduleList],
      nfEligibility,
      placementCycle: initialJobData.placementCycle
    }
  };

  const handleAddNewJob = async (e: any) => {
    e.preventDefault();

    await createJob(await assembleJobData());
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobData({
      ...jobData,
      company: {
        ...jobData.company,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleJobChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className=" w-100 px-5 py-5 grey2b">
        <div>
          <span className="fs-14">Placement </span>
          <span
            className=" fs-14 cursor-pointer"
            onClick={() => setOption("Show all NF")}
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
            <form onSubmit={handleAddNewJob}>
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
                    name="companyName"
                    value={jobData.company.companyName}
                    onChange={handleCompanyChange}
                  />
                  {/* <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div> */}
                </div>

                <div className="mb-3">
                  <label htmlFor="Website" className="newjobLabel">
                    Website
                  </label>
                  <input
                    type="text"
                    className="newjobInput"
                    id="Website"
                    name="companyWebsite"
                    value={jobData.company.companyWebsite}
                    onChange={handleCompanyChange}
                  />
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
                      {openCategoryOption === 0
                        ? "Select an Option"
                        : openCategoryOption}
                    </button>

                    <ul
                      className={`dropdown-menu ${openCategory ? " show" : ""}`}
                    >
                      {categories.map((item: any) => (
                        <li className="dropdown-item">
                          <button
                            type="button"
                            value={item.categoryName}
                            className="dropdown-option"
                            onClick={() => {
                              setOpenCategory(() => false);
                              setOpenCategoryOption(() => item.categoryId);
                              setJobData({
                                ...jobData,
                                company: { ...jobData.company, category: item },
                              });
                            }}
                          >
                            {item.categoryName}
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
                  <input
                    type="text"
                    className="newjobInput"
                    id="Designation"
                    name="profile"
                    value={jobData.profile}
                    onChange={handleJobChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Place of Posting" className="newjobLabel">
                    Place of Posting
                  </label>
                  <input
                    type="text"
                    className="newjobInput"
                    id="Place of Posting"
                    name="placeOfPosting"
                    value={jobData.placeOfPosting}
                    onChange={handleJobChange}
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
                    name="jobDescription"
                    value={jobData.jobDescription}
                    onChange={handleJobChange}
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
                  <input
                    type="text"
                    className="newjobInput"
                    id="CTC"
                    name="ctc"
                    value={jobData.ctc}
                    onChange={handleJobChange}
                  />
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
                    name="ctcBreakup"
                    value={jobData.ctcBreakup}
                    onChange={handleJobChange}
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
                    name="bondDetails"
                    value={jobData.bondDetails}
                    onChange={handleJobChange}
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
                            {courses.map((course: any) => {
                              return (
                                <div
                                  className="courseButtonDiv border"
                                  key={course.courseId}
                                >
                                  <button
                                    className="courseButton"
                                    onClick={() =>
                                      setCurrCourse(course.courseId)
                                    }
                                  >
                                    <div className="courseName">
                                      {" "}
                                      {course.courseName}
                                    </div>
                                    {/* <div className="courseYear"> 4-years</div> */}
                                  </button>
                                </div>
                              );
                            })}
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
                                                  specializations.length
                                              }
                                              checked={isAllSelected()}
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
                                      {specializations.map(
                                        (row: any, index: number) => {
                                          const isItemSelected = isSelected(
                                            row.specId
                                          ) ? true : false;
                                          const labelId = row.specId;

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
                                                {row.departmentName}
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.disciplineName}
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.specName}
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
                                                  onChange={(event) =>
                                                    handleClick(
                                                      event,
                                                      row
                                                    )
                                                  }
                                                />
                                              </TableCell>
                                            </TableRow>
                                          );
                                        }
                                      )}
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
                      {[{
                        label: "Stage",
                        name: "stage",
                        value: stageData?.stage,
                        dropdownData: selectionStages.map((stage: any) => {
                          return ({ name: stage.stageName, value: stage.stageId });
                        })
                      },{
                        label: "Stage Type",
                        name: "stageType",
                        value: stageData?.stageType,
                        dropdownData: [{ name: 'Technical', value: 'Tech' }, { name: 'Aptitude', value: 'Apti' }, { name: 'Other', value: 'Other' }]
                      },{
                        label: "Stage Mode",
                        name: "stageMode",
                        value: stageData?.stageMode,
                        dropdownData: ['Virtual', 'Physical'].map((mode: string) => {
                          return ({ name: mode, value: mode });
                        })
                      }].map(
                        (item: any) => {
                          return (
                            <div className="col-3">
                              <div className="d-flex justify-content-center w-100">
                                <div
                                  className="mb-3 dropdownBody"
                                  style={{ height: "40px", width: "200px" }}
                                >
                                  <label htmlFor="mode" className="newjobLabel">
                                    {item.label}
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
                                        setOpenSchedule(item.label);
                                        // setOpenCategoryOption(() => "");
                                      }}
                                    >
                                      {(item.value === '' || item.value===0)? "Select an option": item.dropdownData?.find((data: any) => data.value===item.value)?.name}
                                    </button>

                                    <ul
                                      className={`dropdown-menu ${
                                        openSchedule===item.label ? " show" : ""
                                      }`}
                                    >
                                      {item.dropdownData.map((data: any) => (
                                        <li className="dropdown-item">
                                          <button
                                            type="button"
                                            value={data.value}
                                            className="dropdown-option"
                                            onClick={() => {
                                              setOpenSchedule("None");
                                              setStageData({ ...stageData, [item.name]: data.value })
                                            }}
                                          >
                                            {data.name}
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
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
                          <div
                            key={item.stage?.stageId}
                            className="scrollSchedule"
                          >
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
                                  Stage {stage + 1}: {item.stage?.stageName}
                                </Typography>

                                <div className="d-flex justify-content-center">
                                  <div>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                    >
                                      Mode: {item.stageMode}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                    >
                                      Type of Stage: {item.stageType}
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
              {/* <div className="my-5">
                <Divider>
                  <Chip label="SKILL BASED HIRING" />
                </Divider>
                <div className="my-3">
                  <label htmlFor="Company Name" className="newjobLabel">
                    Skills
                  </label>
                  <div>
                    <FormControl sx={{ mt: 1, mb: 3, width: "100%" }}>
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
                        {skills.map((skill) => (
                          <MenuItem key={skill} value={skill}>
                            <Checkbox
                              checked={personName.indexOf(skill) > -1}
                            />
                            <ListItemText primary={skill} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div> */}
              {/* HR Details */}
              <div className="my-5">
                <Divider>
                  <Chip label="HR Details" />
                </Divider>
                <div>
                  <div className="mb-3">
                    <label htmlFor="Company Name" className="newjobLabel">
                      Name
                    </label>
                    <input
                      type="text"
                      className="newjobInput"
                      id="HRName"
                      name="name"
                      value={primaryHr.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPrimaryHr({ ...primaryHr, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Company Name" className="newjobLabel">
                      Phone
                    </label>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: "10px",
                      }}
                    >
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Country Code"
                        defaultValue="+91"
                        style={{ width: "18%" }}
                        name="phonePref"
                        value={primaryHr.phones?.[0]?.phonePref}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPrimaryHr({
                            ...primaryHr,
                            phones: [
                              {
                                ...primaryHr.phones?.[0],
                                phonePref: e.target.value,
                              },
                            ],
                          })
                        }
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Phone Number"
                        style={{ width: "80%" }}
                        value={primaryHr.phones?.[0]?.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPrimaryHr({
                            ...primaryHr,
                            phones: [
                              {
                                ...primaryHr.phones?.[0],
                                phone: e.target.value,
                              },
                            ],
                          })
                        }
                      />
                    </div>
                    <div id="emailHelp" className="form-text">
                      We'll never share your phone number with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Company Name" className="newjobLabel">
                      Email ID
                    </label>
                    <input
                      type="email"
                      className="newjobInput"
                      id="HREmail"
                      name="email"
                      value={primaryHr.emails?.[0]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPrimaryHr({ ...primaryHr, emails: [e.target.value] })
                      }
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Company Name" className="newjobLabel">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      className="newjobInput"
                      id="linkedIn"
                      name="linkedin"
                      value={primaryHr.linkedin}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPrimaryHr({ ...primaryHr, linkedin: e.target.value })
                      }
                    />
                  </div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={secondaryHR}
                        onChange={() => setSecondaryHR((prev) => !prev)}
                      />
                    }
                    label="Add Secondary HR Details"
                  />
                </div>
                {secondaryHR && (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="Company Name" className="newjobLabel">
                        Name
                      </label>
                      <input
                        type="text"
                        className="newjobInput"
                        id="HRName"
                        name="name"
                        value={secondaryHr.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSecondaryHr({
                            ...secondaryHr,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Company Name" className="newjobLabel">
                        Phone
                      </label>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: "10px",
                        }}
                      >
                        <TextField
                          id="outlined-select-currency"
                          select
                          label="Country Code"
                          defaultValue="+91"
                          style={{ width: "18%" }}
                          name="phonePref"
                          value={secondaryHr.phones?.[0]?.phonePref}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSecondaryHr({
                              ...secondaryHr,
                              phones: [
                                {
                                  ...secondaryHr.phones?.[0],
                                  phonePref: e.target.value,
                                },
                              ],
                            })
                          }
                        >
                          {currencies.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Phone Number"
                          style={{ width: "80%" }}
                          value={secondaryHr.phones?.[0]?.phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSecondaryHr({
                              ...secondaryHr,
                              phones: [
                                {
                                  ...secondaryHr.phones?.[0],
                                  phone: e.target.value,
                                },
                              ],
                            })
                          }
                        />
                      </div>
                      <div id="emailHelp" className="form-text">
                        We'll never share your phone number with anyone else.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Company Name" className="newjobLabel">
                        Email ID
                      </label>
                      <input
                        type="email"
                        className="newjobInput"
                        id="HREmail"
                        name="email"
                        value={secondaryHr.emails?.[0]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSecondaryHr({
                            ...secondaryHr,
                            emails: [e.target.value],
                          })
                        }
                      />
                      <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Company Name" className="newjobLabel">
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        className="newjobInput"
                        id="linkedIn"
                        name="linkedin"
                        value={secondaryHr.linkedin}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSecondaryHr({
                            ...secondaryHr,
                            linkedin: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* Assign spocs */}
              <div className="my-5">
                <Divider>
                  <Chip label="ASSIGN SPOCs" />
                </Divider>
                <div className="my-3">
                  <label htmlFor="Company Name" className="newjobLabel ms-2">
                    Primary SPOC
                  </label>
                  <div>
                    <FormControl sx={{ width: "100%" }}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={primaryspoc}
                          onChange={(e) => {
                            setPrimaryspoc(() => e.target.value);
                          }}
                          label="Select Primary SPOC"
                        >
                          <MenuItem value="None">
                            <em>None</em>
                          </MenuItem>
                          {scpts.map((scpt: any) => (
                            <MenuItem value={scpt.scptId}>{scpt.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FormControl>
                  </div>
                </div>
                <div className="my-3">
                  <label htmlFor="Company Name" className="newjobLabel ms-2">
                    Secondary SPOC
                  </label>
                  <div>
                    <FormControl sx={{ width: "100%" }}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={secondaryspoc}
                          onChange={(e) => {
                            setsecondaryspoc(() => e.target.value);
                          }}
                          label="Select Primary SPOC"
                        >
                          <MenuItem value="None">
                            <em>None</em>
                          </MenuItem>
                          {scpts.map((scpt: any) => (
                            <MenuItem value={scpt.scptId}>{scpt.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FormControl>
                    {primaryspoc === secondaryspoc && primaryspoc !== "" && (
                      <div
                        id="emailHelp"
                        className="ms-2 form-text text-danger"
                      >
                        Primary and Secondary SPOCs are the same.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="my-5">
                <Divider>
                  <Chip label="Add Additional Files" />
                </Divider>
                <div className="my-3">
                  <label htmlFor="Company Name" className="newjobLabel ms-2">
                    Choose additional files (if any)
                  </label>
                  <div className="m-3">
                    {/* <Button
                      variant="outlined"
                      component="label"
                      startIcon={<FileUploadIcon />}
                      // onClick={handleUploadClick}
                    >
                      Upload Files
                      <input
                        hidden
                        accept="pdf"
                        multiple
                        type="file"
                        // ref={hiddenFileInput}
                        onChange={handleUploadChange}
                      />
                    </Button> */}
                    <input type="file" onChange={handleFileChange} multiple />

                    <ul>
                      {files.map((file, i) => (
                        <li key={i}>
                          {file.name} - {file.type}
                        </li>
                      ))}
                    </ul>

                    <button onClick={handleUploadClick} disabled={isUploading}>Upload</button>
                    {isUploading && (<h6>Uploading...</h6>)}
                  </div>
                </div>
              </div>
              {/* Additional Info */}
              <div className="my-5">
                <Divider>
                  <Chip label="Add Additional Info" />
                </Divider>

                <div className="my-3">
                  <label htmlFor="Company Name" className="newjobLabel ms-2">
                    Add Additional Details
                  </label>

                  <div>
                    <ReactQuill
                      theme="snow"
                      value={jobData.additionalDetails}
                      onChange={(value) =>
                        setJobData({ ...jobData, additionalDetails: value })
                      }
                      modules={modules}
                      style={{ height: "300px", marginBottom: "150px" }}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={isUploading}>
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
