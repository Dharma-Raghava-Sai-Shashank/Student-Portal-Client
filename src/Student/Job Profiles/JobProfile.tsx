import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderStudent } from '../Headers/HeaderStudent'
import { StudentSidebar } from '../Sidebars/StudentSidebar'
import { jobProfileData } from './jobProfileData'
import { NFTableShow } from './NFTableShow'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'
import './styles.scss'
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

    const isEligible = true;

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
  const [option, setOption] = useState<string>('Placement')
  const [session, setSession] = useState<string>('Full Time Hiring 2023-24')
  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
        <NFTableShow
          option={option}
          setOption={setOption}
          session={session}
          setSession={setSession}
        />
        {/* <div className="container mt-4">
          <TableContainer>
            <Table>
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
        </div> */}
      </div>
    </div>
  )
}
