import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { jobProfileData } from "./jobProfileData";
import Avatar from "@mui/material/Avatar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import "./JobProfileDetail.scss";
import { HeaderStudent } from "../Headers/HeaderStudent";
import { StudentSidebar } from "../Sidebars/StudentSidebar";
import { HiringWorkflow } from "./HiringWorkflow";
import Navbar from "./Navbar";

export default function JobProfileDetail() {
  const { id } = useParams();
  const jobId = parseInt(id);
  const selectedProfile = jobProfileData.find(
    (profile) => profile.id === jobId
  );

  const [activeSection, setActiveSection] = useState("jobDescription");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!selectedProfile) {
    return <div className="job-profile-detail">Job profile not found.</div>;
  }

  const {
    jobDescription,
    additionalDocuments,
    hiringWorkflow,
    studentInfo,
    eligibilityCriteria,
  } = selectedProfile;

  const renderJobDescription = () => (
    <div className="column">
      <strong>Opening Overview</strong>
      <p>Company Name: {jobDescription.companyName}</p>
      <p>Profile: {jobDescription.profile}</p>
      <p>Place of Posting: {jobDescription.placeOfPosting}</p>
      <p>CTC: {jobDescription.ctc}</p>

      <strong>Job Description</strong>
      <p>{jobDescription.description}</p>

      <strong>Required Skills</strong>
      <p>{jobDescription.skills}</p>

      <strong>Additional Information</strong>
      <p>{jobDescription.additionalInfo}</p>

      <strong>Attached Documents</strong>
      <p></p>

      <strong>About {jobDescription.companyName}</strong>
    </div>
  );

  const renderHiringWorkflow = () => (
    <div className="column">
      <HiringWorkflow hiringWorkflow={hiringWorkflow} />
      {/* <h3>Hiring Workflow</h3>
      {hiringWorkflow.map((stage) => (
        <div key={stage.stageId}>
          <p>Stage Type: {stage.stageType}</p>
          <p>Stage Mode: {stage.stageMode}</p>
          {/* Additional fields 
        </div>
      ))} */}
    </div>
  );

  const renderEligibilityCriteria = () => (
    <div className="column">
      <strong>Eligibility Criteria</strong>
      {eligibilityCriteria &&
        eligibilityCriteria.map((criteria) => (
          <div key={criteria?.spec?.specId}>
            <p>Specialization: {criteria?.spec?.specName}</p>
            <p>CGPA Value: {criteria?.cgpaValue}</p>
            <p>
              Is Eligible:{" "}
              {criteria?.isProfileVerified?.isEligible &&
              criteria?.placementCyclEligibility?.isEligible &&
              criteria?.isNotPalced?.isEligible &&
              criteria?.backlogEligibility?.isEligible &&
              criteria?.courseEligibility?.isEligible &&
              criteria?.academicEligibility?.isEligible &&
              criteria?.edu_History_10_Eligibility?.isEligible &&
              criteria?.edu_History_12_Eligibility?.isEligible
                ? "Yes"
                : "No"}
            </p>
            <p>
              Profile Verified:{" "}
              {criteria?.isProfileVerified?.isEligible
                ? criteria?.isProfileVerified?.message
                : "N/A"}
            </p>
            <p>
              Placement Cycle Eligibility:{" "}
              {criteria?.placementCyclEligibility?.isEligible
                ? criteria?.placementCyclEligibility?.message
                : "N/A"}
            </p>
            <p>
              Not Placed:{" "}
              {criteria?.isNotPalced?.isEligible
                ? criteria?.isNotPalced?.message
                : "N/A"}
            </p>
            <p>
              Backlog Eligibility:{" "}
              {criteria?.backlogEligibility?.isEligible
                ? criteria?.backlogEligibility?.message
                : "N/A"}
            </p>
            <p>
              Course Eligibility:{" "}
              {criteria?.courseEligibility?.isEligible
                ? criteria?.courseEligibility?.message
                : "N/A"}
            </p>
            <p>
              Academic Eligibility:{" "}
              {criteria?.academicEligibility?.message?.Required} (Required) -{" "}
              {criteria?.academicEligibility?.message?.Actual} (Actual)
            </p>
            <p>
              10th Grade Eligibility:{" "}
              {criteria?.edu_History_10_Eligibility?.message?.Required}{" "}
              (Required) -{" "}
              {criteria?.edu_History_10_Eligibility?.message?.Actual} (Actual)
            </p>
            <p>
              12th Grade Eligibility:{" "}
              {criteria?.edu_History_12_Eligibility?.message?.Required}{" "}
              (Required) -{" "}
              {criteria?.edu_History_12_Eligibility?.message?.Actual} (Actual)
            </p>
            {/* Additional fields */}
          </div>
        ))}
    </div>
  );

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    // Perform any necessary file validation or processing here
    setResumeName(file.name);
  };

  const handleSubmitApplication = () => {
    // Perform any necessary backend API calls or data processing here
    setIsApplied(true);
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
        <div className="p-4 grey2b">
          <div className="bg-white">
            <div className="NFHead ">
              <div className="row pt-5">
                <div className="col-12 col-sm-6 col-md-3 responsivecenter">
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
                <div className="col-12 col-sm-6 col-md-5 responsivecenter">
                  <Box sx={{ width: "100%" }}>
                    <div className="">
                      <Typography variant="h5" gutterBottom>
                        {jobDescription.companyName}
                      </Typography>
                      <Typography
                        variant="button"
                        className="me-3 fw-400 fs-14"
                        display="block"
                      >
                        {jobDescription.profile}
                      </Typography>
                      <div className="mb-2">
                        <Typography variant="button" className="fs-14 fw-400">
                          {jobDescription.placeOfPosting}
                        </Typography>
                      </div>
                    </div>
                    <Chip label={jobDescription.type} variant="outlined" />
                  </Box>
                </div>
                <div className="responsivecenter col-12 col-sm-12 col-md-4 d-flex justify-content-center">
                  <div className="d-flex align-items-end">
                    <Box>
                      <div className="ms-1 ">
                        <div className="mb-5 mx-2 MarginSmall">
                          <Button
                            variant="contained"
                            color={`${isApplied ? "success" : "error"}`}
                            onClick={handleModalOpen}
                          >
                            {isApplied ? "Applied" : "Apply"}
                          </Button>
                        </div>
                        <div className="mt-4 ms-2 MarginSmall">
                          <div>
                            <div>
                              <strong className="text-danger fs-14">
                                Deadline Date:
                              </strong>
                              <strong className="ms-2 fs-16">
                                26th June, 2023
                              </strong>
                            </div>
                            <div>
                              <strong className="text-danger fs-14">
                                Deadline Time:
                              </strong>
                              <strong className="ms-2 fs-16">2:00 pm</strong>
                            </div>
                            <div>
                              <strong className="text-danger fs-14">
                                Status:
                              </strong>
                              <strong className="ms-2 fs-16">
                                In Progress
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </div>
                </div>
              </div>
              <hr className="my-0" />
            </div>
            <div>
              {/* <div
          className="mainHead"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "30px 0 30px 3rem",
          }}
        >
          <img
            src={jobDescription.logo}
            height={90}
            width={100}
            style={{ marginRight: "10px" }}
          />
          <div>
            <h3>
              <strong>{jobDescription.companyName}</strong>
            </h3>
            <p>
              {jobDescription.profile} | {jobDescription.placeOfPosting}
            </p>
            <button
              style={{
                borderRadius: "18px",
                backgroundColor: "transparent",
                borderWidth: "1px",
                borderColor: "rgba(0, 0, 0, 0.453)",
              }}
            >
              Full time 2022-23
            </button>
          </div>
          <div style={{ marginLeft: "50%" }}>
            <button
              className="applyButton"
              style={{
                borderRadius: "18px",
                backgroundColor: "transparent",
                borderWidth: "1px",
                borderColor: "rgba(0, 0, 0, 0.453)",
              }}
              onClick={handleModalOpen}
            >
              {isApplied ? "Applied" : "Apply"}
            </button>
          </div>
        </div> */}
            </div>
            <Navbar
              jobDescription={jobDescription}
              hiringWorkflow={hiringWorkflow}
              eligibilityCriteria={eligibilityCriteria}
            />
            <div>
              {/* <div
              className="navbar"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "10px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "-5px",
                marginTop: "-8px",
              }}
            >
              <button
                className={`nav-button ${
                  activeSection === "jobDescription" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("jobDescription")}
                style={{
                  marginRight: "10px",
                  color: "#333333",
                }}
              >
                Job Description
              </button>
              <button
                className={`nav-button ${
                  activeSection === "hiringWorkflow" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("hiringWorkflow")}
                style={{
                  marginRight: "10px",
                  color: "#333333",
                }}
              >
                Hiring Workflow
              </button>
              <button
                className={`nav-button ${
                  activeSection === "eligibilityCriteria" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("eligibilityCriteria")}
                style={{
                  marginRight: "10px",
                  color: "#333333",
                }}
              >
                Eligibility Criteria
              </button>
            </div>

            <div className="details py-4 px-5">
              {activeSection === "jobDescription" && renderJobDescription()}
              {activeSection === "hiringWorkflow" && renderHiringWorkflow()}
              {activeSection === "eligibilityCriteria" &&
                renderEligibilityCriteria()}
            </div> */}
            </div>

            {isModalOpen && (
              <div id="popup">
                <div id="form">
                  <span id="close" onClick={handleModalClose}>
                    &times;
                  </span>
                  <h2>Apply for {jobDescription.profile}</h2>
                  <div className="form-group">
                    <label htmlFor="fullName">
                      Why are you a perfect fit for this job?
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Why should we hire you?</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Mention your skills </label>
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="resume">Resume</label>
                    <input
                      type="file"
                      id="resume"
                      onChange={handleResumeUpload}
                    />
                    {resumeName && <p>Selected resume: {resumeName}</p>}
                  </div>
                  <button
                    className="applyButton"
                    onClick={handleSubmitApplication}
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
