import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FooterWave from "../../Images/FooterWave.svg";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Stack from "@mui/material/Stack";
import { Boards } from "./Boards";
import { Branch } from "./Branch";
import "./index.scss";
import {useNavigate} from "react-router-dom";


const steps = ["Personal Details", "Educational Details", "Upload Resume"];
const API_URL = "https://student-portal-server-2sbh.onrender.com/api/student/profile";

export default function Registration() {
  const maxSemester = 8;
  const [marksType10th, setMarksType10th] = React.useState("%");
  const [marksType12th, setMarksType12th] = React.useState("%");
  const [branches, setBranches] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const [information, setInformation] = React.useState({
    name: "",
    dateofbirth: "",
    gender: "",
    category: "",
    contact: "",
    email: "",
    personalemail: "",
    permanentaddress: "",
    currentaddress: "",
    fathername: "",
    aadhar: "",
    ewsgeneral: "",
    pwd: "",
    class10schoolname: "",
    class10durationfrom: "",
    class10durationto: "",
    class10boards: "",
    class10percentage: "",
    class10cgpa: "",
    class10score: "",
    class10grade: "",
    class10gradesheet: null as File | null,
    class12schoolname: "",
    class12durationfrom: "",
    class12durationto: "",
    class12boards: "",
    class12percentage: "",
    class12cgpa: "",
    class12score: "",
    class12grade: "",
    class12gradesheet: null as File | null,
    graduationyear: "",
    degree: "",
    currentsemester: "",
    presenteducationdurationfrom: "",
    presenteducationdurationto: "",
    percentage: "",
    gradesheet: null as File | null,
    resume: null as File | null
  })      
  
  const navigate = useNavigate();

  function handle12thMarks(e: React.FormEvent) {
    setMarksType12th((e.target as HTMLSelectElement).value);
  }
  function handle10thMarks(e: React.FormEvent) {
    setMarksType10th((e.target as HTMLSelectElement).value);
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(information)
    })
    .then((response)=>{
      console.log(information)
      console.log(response)
      alert("Thank you for filling out the form. Redirecting you to your page.")
      navigate("/student/dashboard")
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  function renderBranch(e: React.FormEvent) {
    // setMarksType12th((e.target as HTMLSelectElement).value);
    // let degree: string = (e.target as HTMLSelectElement).value;
    // let branch: Array<string> = Boards.degree;
    // setBranches(Boards[]);
    // console.log(
    //   (e.target as HTMLSelectElement).value,
    //   Branch.(e.target as HTMLSelectElement).value
    // );
  }

  return (
    <div className="MainRegPage backgroundAnimation">
      <div className="d-flex justify-content-center">
        <div className="RegistrationDiv col-12 col-md-9 mx-3">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} nonLinear>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                    <div className="d-flex justify-content-center">
                      <div className="RegistrationInputBox mx-2 col-11 col-md-10 mb-4">
                        {activeStep === 0 ? (
                          <div className="d-flex justify-content-center">
                            <div className="RegistrationInputFields col-11 col-md-9 px-3 my-4 pt-2 pb-4">
                              <label>Name</label>
                              <input
                                className="form-control shadow-none mb-2"
                                type="text"
                                value={information.name}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    name: e.target.value
                                  })
                                }
                              />
                              <label>Date of Birth</label>
                              <input
                                className="form-control shadow-none mb-2 col-12 col-sm-6"
                                placeholder="DD/MM/YYYY"
                                type="date"
                                value={information.dateofbirth}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    dateofbirth: e.target.value
                                  })
                                }
                              />
                              <div className="form-group">
                                <label>Gender</label>
                                <select className="form-control"
                                  onChange={
                                    (e) => setInformation({
                                      ...information,
                                      gender: e.target.value
                                    })
                                  }>
                                  <option selected disabled>
                                    Choose...
                                  </option>
                                  <option>Male </option>
                                  <option>Female</option>
                                  <option>Others</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label>Category</label>
                                <select className="form-control"
                                  onChange={
                                    (e) => setInformation({
                                      ...information,
                                      category: e.target.value
                                    })
                                  }>
                                  <option selected disabled>
                                    Choose...
                                  </option>
                                  <option>General</option>
                                  <option>OBC</option>
                                  <option>SC/ST</option>
                                  <option>EWS</option>
                                </select>
                              </div>
                              <label>Contact Number</label>
                              <input
                                className="form-control shadow-none mb-2"
                                type="text"
                                placeholder="+91 1234567890"
                                value={information.contact}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    contact: e.target.value
                                  })
                                }
                              />
                              <label>Email</label>
                              <input
                                className="form-control shadow-none mb-2"
                                type="text"
                                value={information.email}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    email: e.target.value
                                  })
                                }
                              />
                              <label>Personal Email</label>
                              <input
                                className="form-control shadow-none mb-2"
                                type="text"
                                value={information.personalemail}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    personalemail: e.target.value
                                  })
                                }
                              />
                              <label>Permanent Address</label>
                              <textarea
                                className="form-control shadow-none mb-2"
                                style={{ height: "100px" }}
                                value={information.permanentaddress}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    permanentaddress: e.target.value
                                  })
                                }
                              />
                              <label>Current Address</label>
                              <textarea
                                className="form-control shadow-none mb-2"
                                style={{ height: "100px" }}
                                value={information.currentaddress}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    currentaddress: e.target.value
                                  })
                                }
                              />

                              <label
                                style={{ fontSize: "1.3rem" }}
                                className="d-block mt-4"
                              >
                                Additional Info
                              </label>
                              <label>Father's Name</label>
                              <input
                                className="form-control shadow-none mb-2"
                                type="text"
                                value={information.fathername}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    fathername: e.target.value
                                  })
                                }
                              />
                              <label>Aadhar No.</label>
                              <input
                                className="form-control shadow-none mb-2"
                                type="text"
                                value={information.aadhar}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    aadhar: e.target.value
                                  })
                                }
                              />
                              <div className="form-group">
                                <label>Do you belong to EWS-General </label>
                                <select className="form-control"
                                  onChange={
                                    (e) => setInformation({
                                      ...information,
                                      ewsgeneral: e.target.value
                                    })
                                  }>
                                  <option selected disabled>
                                    Choose...
                                  </option>
                                  <option>Yes</option>
                                  <option>No</option>
                                </select>
                                <label>Do you belong to PwD</label>
                                <select className="form-control"
                                  onChange={
                                    (e) => setInformation({
                                      ...information,
                                      pwd: e.target.value
                                    })
                                  }>
                                  <option selected disabled>
                                    Choose...
                                  </option>
                                  <option>Yes</option>
                                  <option>No</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {activeStep === 1 ? (
                          <div>
                            <label className="d-block previousEducation col-11 col-md-10 px-3 my-3">
                              Previous Education
                            </label>
                            <div className="d-flex justify-content-center">
                              <div className="RegistrationInputFields border col-11 col-md-10 px-4 py-2 mb-4">
                                <label className="d-block previousEducationHeading">
                                  Class 10th
                                </label>
                                <label>School Name</label>
                                <input
                                  className="form-control shadow-none mb-2"
                                  type="text"
                                  value={information.class10schoolname}
                                  onChange={
                                    (e) => setInformation({
                                      ...information,
                                      class10schoolname: e.target.value
                                    })
                                  }
                                />

                                <div className="form-group">
                                  <label>Boards</label>
                                  <select className="form-control"
                                    onChange={
                                      (e) => setInformation({
                                        ...information,
                                        class10boards: e.target.value
                                      })
                                    }>
                                    <option selected disabled>
                                      Choose...
                                    </option>
                                    {Boards.map((board) => (
                                      <option value={board}>{board}</option>
                                    ))}
                                  </select>
                                </div>

                                <label className="mt-4 d-block">Duration</label>
                                <div className="form-row row mb-4">
                                  <div className="form-group col-md-5 d-flex my-1">
                                    <label className="me-3 subLabel">
                                      From
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      value={information.class10durationfrom}
                                      onChange={
                                        (e) => setInformation({
                                          ...information,
                                          class10durationfrom: e.target.value
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-2 "></div>
                                  <div className="form-group col-md-5 d-flex my-1">
                                    <label className="me-3 subLabel">To</label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      value={information.class10durationto}
                                      onChange={
                                        (e) => setInformation({
                                          ...information,
                                          class10durationto: e.target.value
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-md-3">
                                    <label>Enter Grade </label>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="row">
                                      {marksType10th === "%" ? (
                                        <input
                                          className="form-control shadow-none mb-2"
                                          type="number"
                                          min="0"
                                          max="100"
                                          value={information.class10percentage}
                                          onChange={
                                            (e) => setInformation({
                                              ...information,
                                              class10percentage: e.target.value
                                            })
                                          }
                                        />
                                      ) : (
                                        <></>
                                      )}
                                      {marksType10th === "CGPA" ? (
                                        <div className="row">
                                          <div className="col-md-6">
                                            <input
                                              className="form-control shadow-none mb-2"
                                              type="number"
                                              max="10"
                                              placeholder="Score"
                                              value={information.class10score}
                                              onChange={
                                                (e) => setInformation({
                                                  ...information,
                                                  class10score: e.target.value
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="col-md-6">
                                            <input
                                              className="form-control shadow-none mb-2"
                                              type="number"
                                              min = "0"
                                              max="10"
                                              placeholder="Total CGPA"
                                              value={information.class10cgpa}
                                              onChange={
                                                (e) => setInformation({
                                                  ...information,
                                                  class10cgpa: e.target.value
                                                })
                                              }
                                            />
                                          </div>
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                      {marksType10th === "GRADES" ? (
                                        <div>
                                          <input
                                            className="form-control shadow-none mb-2"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={information.class10grade}
                                            onChange={
                                              (e) => setInformation({
                                                ...information,
                                                class10grade: e.target.value
                                              })
                                            }
                                          />
                                          <small>
                                            Write the percentage equivalent
                                          </small>
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                      className="form-control"
                                      onChange={(e) => handle10thMarks(e)}
                                    >
                                      <option selected disabled>
                                        Choose...
                                      </option>
                                      <option value="%">%</option>
                                      <option value="CGPA">CGPA</option>
                                      <option value="GRADES">GRADES</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-6 d-flex align-items-center">
                                    <label>Upload Marksheet/ gradesheet</label>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <Button
                                      variant="outlined" component="label">
                                      Add Pdf File
                                      <input
                                        type="file"
                                        onChange={
                                          (e) => {
                                            const file = e.target.files && e.target.files[0];
                                            if(file) {
                                              setInformation({
                                                ...information,
                                                class10gradesheet: file
                                              })
                                              const formData = new FormData();
                                              formData.append('file', file);
                                            }
                                          }
                                        }
                                      />
                                      <FileUploadIcon />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center">
                              <div className="RegistrationInputFields border col-11 col-md-10 px-4 py-2 mb-4">
                                <label className="d-block previousEducationHeading">
                                  Class 12th
                                </label>
                                <label>School Name</label>
                                <input
                                  className="form-control shadow-none mb-2"
                                  type="text"
                                  value={information.class12schoolname}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    class12schoolname : e.target.value
                                  })
                                }
                                />

                                <div className="form-group">
                                  <label>Boards</label>
                                  <select className="form-control"
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    class12boards : e.target.value
                                  })
                                }>
                                    <option selected disabled>
                                      Choose...
                                    </option>
                                    {Boards.map((board) => (
                                      <option value={board}>{board}</option>
                                    ))}
                                  </select>
                                </div>

                                <label className="mt-4 d-block">Duration</label>
                                <div className="form-row row mb-4">
                                  <div className="form-group col-md-5 d-flex my-1">
                                    <label className="me-3 subLabel">
                                      From
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      value={information.class12durationfrom}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    class12durationfrom : e.target.value
                                  })
                                }
                                    />
                                  </div>
                                  <div className="form-group col-md-2 "></div>
                                  <div className="form-group col-md-5 d-flex my-1">
                                    <label className="me-3 subLabel">To</label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      value={information.class12durationto}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    class12durationto : e.target.value
                                  })
                                }
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-md-3">
                                    <label>Enter Grade </label>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="row">
                                      {marksType12th === "%" ? (
                                        <input
                                          className="form-control shadow-none mb-2"
                                          type="number"
                                          min="0"
                                          max="100"
                                          value={information.class12percentage}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    class12percentage : e.target.value
                                  })
                                }
                                        />
                                      ) : (
                                        <></>
                                      )}
                                      {marksType12th === "CGPA" ? (
                                        <div className="row">
                                          <div className="col-md-6">
                                            <input
                                              className="form-control shadow-none mb-2"
                                              type="number"
                                              max="10"
                                              placeholder="Score"
                                              value={information.class12cgpa}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    class12score : e.target.value
                                  })
                                }
                                            />
                                          </div>
                                          <div className="col-md-6">
                                            <input
                                              className="form-control shadow-none mb-2"
                                              type="number"
                                              max="10"
                                              placeholder="Total CGPA"
                                              value={information.class12cgpa}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    class12cgpa : e.target.value
                                  })
                                }
                                            />
                                          </div>
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                      {marksType12th === "GRADES" ? (
                                        <div>
                                          <input
                                            className="form-control shadow-none mb-2"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={information.class12grade}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    class12grade : e.target.value
                                  })
                                }
                                          />
                                          <small>
                                            Write the percentage equivalent
                                          </small>
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                      className="form-control"
                                      onChange={(e) => handle12thMarks(e)}
                                    >
                                      <option selected disabled>
                                        Choose...
                                      </option>
                                      <option value="%">%</option>
                                      <option value="CGPA">CGPA</option>
                                      <option value="GRADES">GRADES</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-6 d-flex align-items-center">
                                    <label>Upload Marksheet/ gradesheet</label>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <Button
                                      variant="outlined"
                                      component="label"
                                    >
                                      Add Pdf File
                                      <input type="file"
                                onChange={
                                  (e) => {
                                    const file = e.target.files && e.target.files[0];
                                    if(file) {
                                      setInformation({
                                        ...information,
                                        class12gradesheet: file
                                      })
                                      const formData = new FormData();
                                      formData.append('file', file);
                                    }
                                  }
                                }
                                      />
                                      <FileUploadIcon />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <label className="d-block previousEducation col-11 col-md-10 px-3 my-3">
                              Present Education
                            </label>
                            <div className="d-flex justify-content-center">
                              <div className="RegistrationInputFields border col-11 col-md-10 px-4 py-2 mb-4">
                                <div className="form-group col-md-6">
                                  <label>Graduation Year</label>
                                  <input
                                    className="form-control shadow-none mb-2"
                                    type="number"
                                    placeholder="YYYY"
                                    value={information.graduationyear}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    graduationyear : e.target.value
                                  })
                                }
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Degree Name</label>
                                  <select
                                    className="form-control"
                                    onChange={e=>{
                                      renderBranch(e)
                                      setInformation({
                                        ...information,
                                        degree : e.target.value
                                      })
                                    }}
                                  >
                                    <option selected disabled>
                                      Choose...
                                    </option>
                                    <option value="B.Tech">B.Tech</option>
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label>Current Semester</label>
                                  <select className="form-control" value={information.currentsemester}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    currentsemester : e.target.value
                                  })
                                }>
                                    <option selected disabled>
                                      Choose...
                                    </option>
                                    {Array.from(Array(maxSemester).keys()).map(
                                      (item) => (
                                        <option>{item + 1}</option>
                                      )
                                    )}
                                  </select>
                                </div>

                                <label className="mt-4 d-block">Duration</label>
                                <div className="form-row row mb-4">
                                  <div className="form-group col-md-5 d-flex my-1">
                                    <label className="me-3 subLabel">
                                      From
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      value={information.presenteducationdurationfrom}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    presenteducationdurationfrom : e.target.value
                                  })
                                }
                                    />
                                  </div>
                                  <div className="form-group col-md-2 "></div>
                                  <div className="form-group col-md-5 d-flex my-1">
                                    <label className="me-3 subLabel">To</label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      value={information.presenteducationdurationto}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    presenteducationdurationto : e.target.value
                                  })
                                }
                                    />
                                  </div>
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Percentage/GPA Obtained</label>
                                  <input
                                    className="form-control shadow-none mb-2"
                                    type="text"
                                    value={information.percentage}
                                onChange={
                                  (e) => setInformation({
                                    ...information,
                                    percentage : e.target.value
                                  })
                                }
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-6 d-flex align-items-center">
                                    <label>Upload Marksheet/ gradesheet</label>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <Button
                                      variant="outlined"
                                      component="label"
                                    >
                                      Add Pdf File
                                      <input
                                        hidden
                                        accept="application/pdf"
                                        multiple
                                        type="file"
                                onChange={
                                  (e) => {
                                    const file = e.target.files && e.target.files[0];
                                    if(file) {
                                      setInformation({
                                        ...information,
                                        gradesheet: file
                                      })
                                      const formData = new FormData();
                                      formData.append('file', file);
                                    }
                                  }
                                }
                                      />
                                      <FileUploadIcon />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {activeStep === 2 ? (
                          <div>
                            <div className="d-flex justify-content-center">
                              <div
                                className="RegistrationInputFields col-11 col-md-9 px-3 mt-5 mb-2 pt-5 pb-2 "
                                style={{ height: "200px" }}
                              >
                                <div className="row">
                                  <div className="col-12 col-md-6 d-flex align-items-center">
                                    <label>Upload Resume</label>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <Button
                                      variant="outlined"
                                      component="label"
                                    >
                                      Add Pdf File
                                      <input
                                        type="file"
                                        onChange={
                                          (e) => {
                                            const file = e.target.files && e.target.files[0];
                                            if(file) {
                                              setInformation({
                                                ...information,
                                                resume: file
                                              })
                                              const formData = new FormData();
                                              formData.append('file', file);
                                            }
                                          }
                                        }
                                      />
                                      <FileUploadIcon className="ms-3" />
                                      <button onClick={(e)=>console.log(information)}>Submit</button>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          {activeStep !== 0 ? (
                            <Button
                              color="inherit"
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                              className="greyButton px-4 m-3 py-1"
                            >
                              Back
                            </Button>
                          ) : (
                            <></>
                          )}

                          <Box sx={{ flex: "1 1 auto" }} />

                          {activeStep === steps.length-1 &&
                              <Button
                                className="greenButton px-4 py-2 m-3"
                                onClick={handleComplete}
                              >
                                Submit
                              </Button>
                            }
                          {activeStep !== 2 ? (
                            <Button
                              className="greyButton px-4 m-3 py-1"
                              onClick={handleNext}
                              sx={{ mr: 1 }}
                            >
                              Next
                            </Button>
                          ) : (
                            <></>
                          )}
                        </Box>
                      </div>
                    </div>
                  </Typography>
                </React.Fragment>
              )}
            </div>
          </Box>
        </div>
      </div>

      <div className="footerWave">
        <div>
          <img src={FooterWave} width="100%"></img>
        </div>
      </div>
    </div>
  );
}

