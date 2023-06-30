import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderStudent } from '../Headers/HeaderStudent'
import { StudentSidebar } from '../Sidebars/StudentSidebar'
import { jobProfileData } from './jobProfileData'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'
import './styles.css'
import { width } from '@mui/system'

export default function JobProfile() {
  const [filter, setFilter] = useState('')
  const [selectedProfile, setSelectedProfile] = useState(null)
  const navigate = useNavigate()

  const handleProfileClick = (profile: any) => {
    setSelectedProfile(profile)
  }

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value)
  }

  const handleApply = (profile: any) => {
    const { eligibilityCriteria } = profile

    const isEligible = eligibilityCriteria.length > 0

    if (isEligible) {
      const updatedProfile = {
        ...profile,
        status: 'applied',
      }
      const updatedProfiles = jobProfileData.map((p) =>
        p.id === updatedProfile.id ? updatedProfile : p,
      )
      setSelectedProfile(updatedProfile)
      navigate(`/student/jobprofile/${updatedProfile.id}`)
    } else {
      console.log('Student is not eligible for this job')
    }
  }

  const filteredProfiles = jobProfileData.filter((profile) => {
    if (filter === 'closed-deadline') {
      return profile.status === 'ineligible' || profile.status === 'applied'
    } else if (filter === 'open-deadline') {
      return profile.status === 'eligible'
    } else {
      return filter ? profile.status === filter : true
    }
  })

  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
        <div className="container mt-4">
          <div className="filter-container">
            <h4>Job Profiles</h4>
            <label htmlFor="filter" className="filter-label">
              Filter:
            </label>
            <select
              id="filter"
              className="filter-select"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="eligible">Eligible</option>
              <option value="ineligible">Ineligible</option>
              <option value="applied">Applied</option>
              <option value="closed-deadline">Closed Deadline</option>
              <option value="open-deadline">Open Deadline</option>
            </select>
          </div>
          <TableContainer>
            <Table style={{ width: '80%' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell>Profile/Designation</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProfiles.map((profile) => (
                  <TableRow
                    key={profile.id}
                    onClick={() => handleProfileClick(profile)}
                    className="profile-row"
                  >
                    <TableCell>{profile.company}</TableCell>
                    <TableCell>{profile.name}</TableCell>
                    <TableCell>{profile.type}</TableCell>
                    <TableCell>
                      {profile.status === 'eligible' && (
                        <Button
                          variant="outlined"
                          className="applyButton"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleApply(profile)
                          }}
                        >
                          Apply
                        </Button>
                      )}
                      {profile.status === 'ineligible' && (
                        <span className="text-danger">Ineligible</span>
                      )}
                      {profile.status === 'applied' && (
                        <span className="text-success">Applied</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}
