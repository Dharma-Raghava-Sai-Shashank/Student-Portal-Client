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

const steps = ["Personal Details", "Educational Details", "Upload Resume"];

export default function Registration() {
  const maxSemester = 8;
  const [marksType10th, setMarksType10th] = React.useState("%");
  const [marksType12th, setMarksType12th] = React.useState("%");
  const [branches, setBranches] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

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
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
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
                              />
                              <label>Date of Birth</label>
                              <input
                                className="form-control shadow-none mb-2 col-12 col-sm-6"
                                placeholder="DD/MM/YYYY"
                                type="date"
                              />
                              <div className="form-group">
                                <label>Gender</label>
                                <select className="form-control">
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
                                <select className="form-control">
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
                              />
                              <label>Email</label>
                              <input
                                className="form-control shadow-none mb-2"
                                type="text"
                              />
                              <label>Personal Email</label>
                              <input
                                className="form-control shadow-none mb-2"
                                type="text"
                              />
                              <label>Permanent Address</label>
                              <textarea
                                className="form-control shadow-none mb-2"
                                style={{ height: "100px" }}
                              />
                              <label>Current Address</label>
                              <textarea
                                className="form-control shadow-none mb-2"
                                style={{ height: "100px" }}
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
                              />
                              <label>Aadhar No.</label>
                              <input
                                className="form-control shadow-none mb-2"
                                type="text"
                              />
                              <div className="form-group">
                                <label>Do you belong to EWS-General </label>
                                <select className="form-control">
                                  <option selected disabled>
                                    Choose...
                                  </option>
                                  <option>Yes</option>
                                  <option>No</option>
                                </select>
                                <label>Do you belong to PwD</label>
                                <select className="form-control">
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
                                />

                                <div className="form-group">
                                  <label>Boards</label>
                                  <select className="form-control">
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
                                    />
                                  </div>
                                  <div className="form-group col-md-2 "></div>
                                  <div className="form-group col-md-5 d-flex my-1">
                                    <label className="me-3 subLabel">To</label>
                                    <input
                                      type="date"
                                      className="form-control"
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
                                            />
                                          </div>
                                          <div className="col-md-6">
                                            <input
                                              className="form-control shadow-none mb-2"
                                              type="number"
                                              max="10"
                                              placeholder="Total CGPA"
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
                                      variant="outlined"
                                      component="label"
                                    >
                                      Add Pdf File
                                      <input
                                        hidden
                                        accept="application/pdf"
                                        multiple
                                        type="file"
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
                                />

                                <div className="form-group">
                                  <label>Boards</label>
                                  <select className="form-control">
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
                                    />
                                  </div>
                                  <div className="form-group col-md-2 "></div>
                                  <div className="form-group col-md-5 d-flex my-1">
                                    <label className="me-3 subLabel">To</label>
                                    <input
                                      type="date"
                                      className="form-control"
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
                                            />
                                          </div>
                                          <div className="col-md-6">
                                            <input
                                              className="form-control shadow-none mb-2"
                                              type="number"
                                              max="10"
                                              placeholder="Total CGPA"
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
                                      <input
                                        hidden
                                        accept="application/pdf"
                                        multiple
                                        type="file"
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
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Degree Name</label>
                                  <select
                                    className="form-control"
                                    onChange={(e) => renderBranch(e)}
                                  >
                                    <option selected disabled>
                                      Choose...
                                    </option>
                                    <option value="B.Tech">B.Tech</option>
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label>Current Semester</label>
                                  <select className="form-control">
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
                                    />
                                  </div>
                                  <div className="form-group col-md-2 "></div>
                                  <div className="form-group col-md-5 d-flex my-1">
                                    <label className="me-3 subLabel">To</label>
                                    <input
                                      type="date"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Percentage/GPA Obtained</label>
                                  <input
                                    className="form-control shadow-none mb-2"
                                    type="text"
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
                                        hidden
                                        accept="application/pdf"
                                        type="file"
                                      />
                                      <FileUploadIcon className="ms-3" />
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

                          {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                              <Button className="greyButton SavedButton px-4 py-2 m-3">
                                Saved
                              </Button>
                            ) : (
                              <Button
                                className="greenButton px-4 py-2 m-3"
                                onClick={handleComplete}
                              >
                                {completedSteps() === totalSteps() - 1
                                  ? "Submit"
                                  : "Save"}
                              </Button>
                            ))}
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
