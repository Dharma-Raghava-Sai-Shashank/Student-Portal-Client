import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { jobProfileData } from './jobProfileData'
import Avatar from '@mui/material/Avatar'
import ApartmentIcon from '@mui/icons-material/Apartment'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import Divider from '@mui/material/Divider'
import './JobProfileDetail.scss'
import { HeaderStudent } from '../Headers/HeaderStudent'
import { StudentSidebar } from '../Sidebars/StudentSidebar'
import { hiringWorkflow } from './HiringWorkflow'
import { eligibilityCriteria } from './EligibilityCriteria'
import Navbar from './Navbar'
import { APIRequest } from '../../api'
import student from '../Profile/StudentProfile'

export default function JobProfileDetail() {
  const { id } = useParams()
  const jobId = id ? parseInt(id) : 0
  const [selectedProfile, setSelectedProfile] = React.useState({});
  // const selectedProfile = jobProfileData.find((profile) => profile.id === jobId)
  React.useEffect(() => {
    (async () => {
      try {
        const jobNumber = localStorage.getItem("jobId")
        const response = await APIRequest(`http://localhost:3001/api/jobs/student/${jobNumber}`, 'GET');
        if (response.success) {
          setSelectedProfile(response)
        }
      } catch (error) {
        console.error('Error occurred during API request:', error);
      }
    })();
  }, [])

  const [activeSection, setActiveSection] = useState('job_description')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resumeName, setResumeName] = useState('')
  const [isApplied, setIsApplied] = useState(false)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  if (!selectedProfile.success) {
    return <div className="job-profile-detail">Job profile not found.</div>
  }

  const {
    job_description,
    additional_documents,
    hiring_wrokflow,
    studentInfo,
    eligibility_criteria,
  } = selectedProfile

  if (selectedProfile.success) {
    console.log(job_description)
    console.log(additional_documents)
    console.log(hiring_wrokflow)
    console.log(studentInfo)
    console.log(eligibility_criteria)
  }

  if (selectedProfile.success) {
    const renderjob_description = () => (
      <div className="column">
        <strong>Opening Overview</strong>
        <p>Company Name: {job_description.companyName}</p>
        <p>Profile: {job_description.profile}</p>
        <p>Place of Posting: {job_description.placeOfPosting}</p>
        <p>CTC: {job_description.ctc}</p>

        <strong>Job Description</strong>
        <p>{job_description.description}</p>

        <strong>Required Skills</strong>
        <p>{job_description.skills}</p>

        <strong>Additional Information</strong>
        <p>{job_description.additionalInfo}</p>

        <strong>Attached Documents</strong>
        <p></p>

        <strong>About {job_description.companyName}</strong>
      </div>
    )

    const renderhiringWorkflow = () => {
      return (
        <div className="column">
          <hiringWorkflow hiringWorkflow={hiring_wrokflow} />
        </div>
      )
    }

    const rendereligibilityCriteria = () => (
      <div className="column">
        <eligibilityCriteria eligibilityCriteria={eligibility_criteria} />
      </div>
    )

    const handleSectionClick = (section) => {
      setActiveSection(section)
    }

    const handleResumeUpload = (event) => {
      const file = event.target.files[0]
      // Perform any necessary file validation or processing here
      setResumeName(file.name)
    }

    const handleSubmitApplication = () => {
      // Perform any necessary backend API calls or data processing here
      setIsApplied(true)
      setIsModalOpen(false)
    }

    const handleModalOpen = () => {
      setIsModalOpen(true)
    }

    const handleModalClose = () => {
      setIsModalOpen(false)
      setFullName('')
      setEmail('')
      setPhone('')
    }

    // return (
    //   <></>
    // )
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
                        className={'doctorcolor'}
                        aria-label="recipe"
                        sx={{ width: 120, height: 120 }}
                      >
                        <ApartmentIcon sx={{ fontSize: '80px' }} />
                      </Avatar>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-5 responsivecenter">
                    <Box sx={{ width: '100%' }}>
                      <div className="">
                        <Typography variant="h5" gutterBottom>
                          {job_description.companyName}
                        </Typography>
                        <Typography
                          variant="button"
                          className="me-3 fw-400 fs-14"
                          display="block"
                        >
                          {job_description.profile}
                        </Typography>
                        <div className="mb-2">
                          <Typography variant="button" className="fs-14 fw-400">
                            {job_description.placeOfPosting}
                          </Typography>
                        </div>
                      </div>
                      <Chip label={job_description.type} variant="outlined" />
                    </Box>
                  </div>
                  <div className="responsivecenter col-12 col-sm-12 col-md-4 d-flex justify-content-center">
                    <div className="d-flex align-items-end">
                      <Box>
                        <div className="ms-1 ">
                          <div className="mb-5 mx-2 MarginSmall">
                            <Button
                              variant="contained"
                              color={`${isApplied ? 'success' : 'error'}`}
                              onClick={handleModalOpen}
                            >
                              {isApplied ? 'Applied' : 'Apply'}
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
              <Navbar
                jobDescription={job_description}
                hiringWorkflow={hiring_wrokflow}
                eligibilityCriteria={eligibility_criteria}
              />
              {isModalOpen && (
                <Box
                  id="popup"
                  sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    outline: '2px solid black',
                    outlineOffset: '-2px',
                  }}
                >
                  <Box
                    sx={{
                      outline: '2px solid black',
                      outlineOffset: '-2px',
                      borderRadius: '4px',
                      width: '600px',
                      maxWidth: '90%',
                      maxHeight: '70%',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                    }}
                  >
                    <Box
                      id="form"
                      sx={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '4px',
                        width: '600px',
                        // maxWidth: '90%', // Set a maximum width to maintain responsiveness
                        maxHeight: '70%',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                          width: '0.2em',
                          background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: '#888',
                          borderRadius: '0.2em',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                          backgroundColor: '#555',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Typography
                          id="close"
                          variant="body1"
                          sx={{ cursor: 'pointer' }}
                          onClick={handleModalClose}
                        >
                          &times;
                        </Typography>
                      </Box>
                      <Typography variant="h2" gutterBottom>
                        Apply for {job_description.profile}
                      </Typography>
                      <Box sx={{ marginBottom: '1rem' }}>
                        <Typography variant="body1">
                          Why are you a perfect fit for this job?
                        </Typography>
                        <TextField
                          type="text"
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          fullWidth
                        />
                      </Box>
                      <Box sx={{ marginBottom: '1rem' }}>
                        <Typography variant="body1">
                          Why should we hire you?
                        </Typography>
                        <TextField
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                        />
                      </Box>
                      <Box sx={{ marginBottom: '1rem' }}>
                        <Typography variant="body1">
                          Mention your skills
                        </Typography>
                        <TextField
                          type="text"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          fullWidth
                        />
                      </Box>
                      <Box sx={{ marginBottom: '1rem' }}>
                        <Typography variant="body1">Resume</Typography>
                        <input
                          type="file"
                          id="resume"
                          onChange={handleResumeUpload}
                          style={{ marginBottom: '0.5rem' }}
                        />
                        {resumeName && (
                          <Typography variant="body2">
                            Selected resume: {resumeName}
                          </Typography>
                        )}
                      </Box>
                      <Button
                        variant="outlined"
                        onClick={handleSubmitApplication}
                      >
                        Submit Application
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <>Not fetching</>
}

