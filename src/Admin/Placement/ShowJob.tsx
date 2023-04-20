import React, { ReactNode, useState } from "react";
import { useParams } from "react-router";
import Avatar from "@mui/material/Avatar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Modal from "react-bootstrap/Modal";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { branches } from "../constants/branches";
import { skills } from "../constants/skills";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { Header1 } from "../Headers/Header1";
import { AddstudentsModal } from "./AddStudentModal";
import "./style.scss";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { htmlTypography } from "../../Student/Dashboard/Dashboard";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

const label = { inputProps: { "aria-label": "Color switch demo" } };

const Schedule = [
  {
    id: "892b",
    StageName: "Resume SL",
    StageMode: "Virtual",
    StageDate: "22/04/2022",
  },
  {
    id: "882b",
    StageName: "Reasoning",
    StageMode: "Virtual",
    StageDate: "22/04/2022",
  },
  {
    id: "881b",
    StageName: "Interview 1",
    StageMode: "On Campus",
    StageDate: "22/04/2022",
  },
  {
    id: "812b",
    StageName: "Group Discussion",
    StageMode: "Virtual",
    StageDate: "22/04/2022",
  },
];

export const HtmlText = (
  <div>
    <p>This is a webpage Why do I have to check this??</p>

    <p>Because whatever.</p>
    <p>
      <strong>Pros:</strong>
    </p>
    <ol>
      <li>
        <strong>checking</strong>
      </li>
      <li>
        <strong>seeing if it works</strong>
      </li>
    </ol>
  </div>
);

export const generateDetails = (detailType: string, detail: string) => {
  return (
    <div className="row mt-3 border-bottom mx-2">
      <div className="col-3 ">
        <Typography variant="subtitle2" sx={{ color: "gray" }} gutterBottom>
          {detailType}
        </Typography>
      </div>
      <div className="col-9">
        <Typography variant="body2" sx={{ fontSize: "0.93rem" }} gutterBottom>
          {detail}
        </Typography>
      </div>
    </div>
  );
};
export const generateHeading = (heading: string) => {
  return (
    <div>
      <Typography variant="subtitle2" sx={{ fontSize: "1rem" }} gutterBottom>
        {heading}
      </Typography>
      <hr style={{ height: "1.3px", margin: 0 }} />
    </div>
  );
};
export const ShowJob = () => {
  const [inputdeadlineTime, setInputDeadlineTime] =
    React.useState<Dayjs | null>();
  const [deadlineTime, setDeadlineTime] = React.useState<Dayjs | null>();
  const [show, setShow] = useState(false);
  const [stageName, setStageName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSetDeadline = () => setDeadlineTime(() => inputdeadlineTime);
  const [showCheckbox, setShowCheckbox] = useState(true);

  const [showStudentModal, setshowStudentModal] = useState(false);

  const params = useParams();
  const applicationId = params.applicationId as string;

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div>
      <div className="d-flex">
        <MainSidebar />
        <div className="w-100">
          <Header1 />

          <div className="d-flex justify-content-center">
            <div className=" w-100 px-5 py-5 grey2b">
              <div>
                <span className="fs-14">Placement | </span>

                <span className={`fs-14  green1c fw-500`}>{applicationId}</span>
              </div>
              <div className="bg-white my-2 shadow-lg ">
                <div>
                  <div className="row pt-2">
                    <div className="col-3  my-5">
                      <div className="d-flex justify-content-center">
                        <Avatar
                          className={"doctorcolor"}
                          aria-label="recipe"
                          sx={{ width: 120, height: 120 }}
                        >
                          <ApartmentIcon sx={{ fontSize: "80px" }} />
                        </Avatar>
                      </div>
                    </div>
                    <div className="col-6 my-5">
                      <Box sx={{ width: "100%", maxWidth: 500 }}>
                        <div className="ms-1">
                          <Typography variant="h4" gutterBottom>
                            Google
                          </Typography>
                          <Typography
                            variant="button"
                            className="me-3"
                            display="block"
                          >
                            Software Developer
                          </Typography>
                          <div className="mb-2">
                            <Typography variant="button">
                              Bangalore, Noida
                            </Typography>
                          </div>
                        </div>
                        <Chip label={"Full time 2022-23"} variant="outlined" />
                      </Box>
                    </div>
                    <div className="col-3 my-2 d-flex align-self-end ">
                      <Box>
                        <div className="ms-1 ">
                          <div>
                            <Typography
                              variant="button"
                              className={`me-3 fw-600 ms-2 ${
                                checked ? "green1c" : "text-danger"
                              }`}
                              display="block"
                            >
                              Status:
                              {checked ? " In Progress" : " Application Closed"}
                            </Typography>
                            <div className="d-flex">
                              <Switch
                                {...label}
                                checked={checked}
                                onChange={handleChange}
                                color="success"
                              />
                              <FormHelperText className="my-2">
                                Click to {checked ? " close" : "open"} the
                                application
                              </FormHelperText>
                            </div>
                          </div>

                          {/* <div>
                            <Typography
                              variant="button"
                              className="me-3 fw-600"
                              display="block"
                            >
                              Close Application ?
                            </Typography>
                            <div className="mb-2">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      {...label}
                                      checked={checked}
                                      onChange={handleChange}
                                      color="success"
                                    />
                                  }
                                  label={`${
                                    checked
                                      ? "Status: In Progress"
                                      : "Status: Application Closed"
                                  }`}
                                />
                              </FormGroup>
                              <FormHelperText>
                                Click to close the application
                              </FormHelperText>
                            </div>
                          </div> */}
                        </div>
                      </Box>
                    </div>
                  </div>
                  <Divider />
                  <div className="row">
                    <div className="col-3 border-right d-flex justify-content-center py-3">
                      <div>
                        <div className="mb-3 ">
                          <div className="d-flex justify-content-center">
                            <Button
                              variant="text"
                              color="success"
                              endIcon={<EditOutlinedIcon />}
                              onClick={handleShow}
                            >
                              {deadlineTime
                                ? "Edit Application Deadine"
                                : "Add Application Deadine"}
                            </Button>
                          </div>
                          {deadlineTime && (
                            <div className="ms-3 mt-2 mb-5">
                              <div>
                                <div>
                                  <strong className="text-danger">
                                    Deadline:
                                  </strong>
                                </div>
                                <div>
                                  <strong className="">
                                    {deadlineTime.format("DD/MM/YYYY hh:mm A")}
                                  </strong>
                                </div>
                              </div>
                            </div>
                          )}
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Add Application Deadine</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="my-4 d-flex justify-content-center">
                                <div className="w-75">
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DemoContainer
                                      components={[
                                        "DateTimePicker",
                                        "DateTimePicker",
                                      ]}
                                    >
                                      <DateTimePicker
                                        label="MM/DD/YYYY hh:mm am/pm"
                                        value={inputdeadlineTime}
                                        onChange={(newValue) =>
                                          setInputDeadlineTime(newValue)
                                        }
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                </div>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  handleClose();
                                  handleSetDeadline();
                                }}
                              >
                                Save
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <div className="my-5">
                            <Button
                              variant="text"
                              color="success"
                              fullWidth
                              sx={{ p: 0, textTransform: "capitalize" }}
                              onClick={() => {
                                setshowStudentModal(true);
                                setShowCheckbox(() => false);
                                setStageName(() => "All Applications");
                              }}
                            >
                              View all students
                            </Button>
                            {Schedule.map((item) => (
                              <Button
                                variant="text"
                                color="success"
                                fullWidth
                                sx={{ p: 0, textTransform: "capitalize" }}
                                onClick={() => {
                                  setshowStudentModal(true);
                                  setShowCheckbox(() => true);
                                  setStageName(() => item.StageName);
                                }}
                              >
                                View {item.StageName} Stage
                              </Button>
                            ))}
                            <Button
                              variant="text"
                              fullWidth
                              color="success"
                              sx={{ p: 0, textTransform: "capitalize" }}
                              onClick={() => {
                                setshowStudentModal(true);
                                setShowCheckbox(() => true);
                                setStageName(() => "Final Shortlist");
                              }}
                            >
                              Final Selected Students
                            </Button>
                            <AddstudentsModal
                              open={showStudentModal}
                              setOpen={setshowStudentModal}
                              showCheckbox={showCheckbox}
                              stageName={stageName}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-9 border p-3">
                      <div>
                        <div className="mb-5">
                          {generateHeading("Company Details")}
                          <div className="mt-2 mb-3">
                            {generateDetails("Company Name", "Google")}
                            {generateDetails(
                              "Placement Cycle",
                              "Full time 2022-23"
                            )}
                            {generateDetails("Website", "careers.google.com")}
                            {generateDetails("Category", "E-Commerece")}
                          </div>
                        </div>
                        <div className="mb-5">
                          {generateHeading("Job Details")}
                          <div className="mt-2 mb-3">
                            {generateDetails(
                              "Designation",
                              "Software Developer"
                            )}
                            {generateDetails("Place of Posting", "Bangalore")}
                            {generateDetails(
                              "Job Description",
                              "consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."
                            )}
                            {generateDetails("Category", "E-Commerece")}
                          </div>
                        </div>
                        <div className="mb-5">
                          {generateHeading("Salary Details")}
                          <div className="mt-2 mb-3">
                            {generateDetails("CTC (in lpa)", "Rs 35,00,000")}
                            {generateDetails(
                              "CTC breakup",
                              "Base Salary: Rs 22,00,000 Stock: Rs 13,00,000"
                            )}
                            {generateDetails(
                              "Bond Details",
                              "consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."
                            )}
                            {generateDetails("Category", "E-Commerece")}
                          </div>
                        </div>
                        <div className="mb-5">
                          <div>
                            {generateHeading(
                              "Eligible Courses and Disciplines"
                            )}
                          </div>
                          <div className="mt-2 mb-3 ms-2">
                            <div className="showSelectectedCourse ">
                              <div className="row showSelectectedCourseDegree">
                                <div className="col-1 degreeDiv pt-5">
                                  <div className="">
                                    <div className="">
                                      <div className="DegreeName"> M.Tech</div>
                                      <div className="DegreeYear"> 2-years</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-11 showSelectectedCourseBranch mt-3">
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
                                              <div className="col-5">
                                                &bull; {row}
                                              </div>
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
                                <div className="col-1 degreeDiv pt-5">
                                  <div className="">
                                    <div className="">
                                      <div className="DegreeName"> B.Tech</div>
                                      <div className="DegreeYear"> 4-years</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-11 showSelectectedCourseBranch mt-3">
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
                                              <div className="col-5">
                                                &bull; {row}
                                              </div>
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
                            </div>
                          </div>
                        </div>
                        <div>
                          {generateHeading("Schedule")}
                          <div className="my-3">
                            {Schedule.map((item, stage) => (
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
                          </div>
                        </div>
                        <div>
                          <div className="mb-5">
                            {generateHeading("Skill Based Hiring")}

                            <div className="my-3 mb-3 ms-3">
                              <ul>
                                {skills.map((skill) => (
                                  <li>{skill}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-5">
                            {generateHeading("HR Details")}

                            <div className="mt-2 mb-5">
                              {generateDetails(
                                "Primary HR Name",
                                "Krittika Barnwal"
                              )}
                              {generateDetails("Phone Number", "8278928092")}
                              {generateDetails(
                                "Email ID",
                                "abss.fkkejfci@jd.com"
                              )}
                            </div>
                            <div className="mt-2 mb-5">
                              {generateDetails(
                                "Secondary HR Name",
                                "Harry Potter"
                              )}
                              {generateDetails("Phone Number", "8278928092")}
                              {generateDetails(
                                "Email ID",
                                "abss.fkkejfci@jd.com"
                              )}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-5">
                            {generateHeading("Assigned SPOC")}

                            <div className="mt-2 mb-5">
                              {generateDetails(
                                "Primary SPOC Name",
                                "Krittika Barnwal"
                              )}
                              {generateDetails("Phone Number", "8278928092")}
                              {generateDetails(
                                "Email ID",
                                "abss.fkkejfci@jd.com"
                              )}
                            </div>
                            <div className="mt-2 mb-5">
                              {generateDetails(
                                "Secondary SPOC Name",
                                "Harry Potter"
                              )}
                              {generateDetails("Phone Number", "8278928092")}
                              {generateDetails(
                                "Email ID",
                                "abss.fkkejfci@jd.com"
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="mb-5">
                              {generateHeading("Additional Infomation")}

                              <div className="mt-2 mb-5" id="AdditionalDetails">
                                {htmlTypography(HtmlText)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
