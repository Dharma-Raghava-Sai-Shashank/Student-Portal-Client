import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { jobProfileData } from './jobProfileData';
import './JobProfileDetail.css';
import { HeaderStudent } from '../Headers/HeaderStudent';
import { StudentSidebar } from '../Sidebars/StudentSidebar';

export default function JobProfileDetail() {
  const { id } = useParams();
  const jobId = parseInt(id);
  const selectedProfile = jobProfileData.find((profile) => profile.id === jobId);

  const [activeSection, setActiveSection] = useState('jobDescription');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [isApplied, setIsApplied] = useState(false);

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
      <h3>Hiring Workflow</h3>
      {hiringWorkflow.map((stage) => (
        <div key={stage.stageId}>
          <p>Stage Type: {stage.stageType}</p>
          <p>Stage Mode: {stage.stageMode}</p>
          {/* Additional fields */}
        </div>
      ))}
    </div>
  );

  const renderEligibilityCriteria = () => (
    <div className="column">
      <strong>Eligibility Criteria</strong>
      {eligibilityCriteria.map((criteria) => (
        <div key={criteria.spec.specId}>
          <p>Specialization: {criteria.spec.specName}</p>
          <p>CGPA Value: {criteria.cgpaValue}</p>
          {/* <p>Min LPA: {criteria.minLPA}</p>
          <p>Max LPA: {criteria.maxLPA}</p> */}
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

  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
        <div
          className="mainHead"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '30px 0 30px 3rem',
          }}
        >
          <img
            src={jobDescription.logo}
            height={90}
            width={100}
            style={{ marginRight: '10px' }}
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
                borderRadius: '18px',
                backgroundColor: 'transparent',
                borderWidth: '1px',
                borderColor: 'rgba(0, 0, 0, 0.453)',
              }}
            >
              Full time 2022-23
            </button>
          </div>
          <div style={{ marginLeft: '50%' }}>
            <button
              className="applyButton"
              style={{
                borderRadius: '18px',
                backgroundColor: 'transparent',
                borderWidth: '1px',
                borderColor: 'rgba(0, 0, 0, 0.453)',
              }}
              onClick={() => setIsModalOpen(true)}
            >
              {isApplied ? 'Applied' : 'Apply'}
            </button>
          </div>
        </div>

        <div
          className="navbar"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '10px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: '-5px',
            marginTop: '-8px',
          }}
        >
          <button
            className={`nav-button ${
              activeSection === 'jobDescription' ? 'active' : ''
            }`}
            onClick={() => handleSectionClick('jobDescription')}
            style={{
              marginRight: '10px',
              color: '#333333',
            }}
          >
            Job Description
          </button>
          <button
            className={`nav-button ${
              activeSection === 'hiringWorkflow' ? 'active' : ''
            }`}
            onClick={() => handleSectionClick('hiringWorkflow')}
            style={{
              marginRight: '10px',
              color: '#333333',
            }}
          >
            Hiring Workflow
          </button>
          <button
            className={`nav-button ${
              activeSection === 'eligibilityCriteria' ? 'active' : ''
            }`}
            onClick={() => handleSectionClick('eligibilityCriteria')}
            style={{
              marginRight: '10px',
              color: '#333333',
            }}
          >
            Eligibility Criteria
          </button>
        </div>

        <div className="details">
          {activeSection === 'jobDescription' && renderJobDescription()}
          {activeSection === 'hiringWorkflow' && renderHiringWorkflow()}
          {activeSection === 'eligibilityCriteria' &&
            renderEligibilityCriteria()}
        </div>

        {isModalOpen && (
          <div className="modal">
            <h2>Upload Resume</h2>
            <input type="file" onChange={handleResumeUpload} />
            {resumeName && <p>Selected Resume: {resumeName}</p>}
            <button onClick={handleSubmitApplication}>Submit</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
