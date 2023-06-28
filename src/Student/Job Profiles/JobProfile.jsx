import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderStudent } from '../Headers/HeaderStudent';
import { StudentSidebar } from '../Sidebars/StudentSidebar';
import { jobProfileData } from './jobProfileData';
import './styles.css';

export default function JobProfile() {
  const [filter, setFilter] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const navigate = useNavigate();

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleApply = (profile) => {
    const { eligibilityCriteria } = profile;

    const isEligible = eligibilityCriteria.length > 0;

    if (isEligible) {
      // Proceed with the application logic
      const updatedProfile = {
        ...profile,
        status: 'applied',
      };
      const updatedProfiles = jobProfileData.map((p) =>
        p.id === updatedProfile.id ? updatedProfile : p
      );
      setSelectedProfile(updatedProfile);
      navigate(`/student/jobprofile/${updatedProfile.id}`);
    } else {
      // Student is not eligible, handle the error or show a message
      console.log('Student is not eligible for this job');
    }
  };

  const filteredProfiles = jobProfileData.filter((profile) => {
    if (filter === 'closed-deadline') {
      return profile.status === 'ineligible' || profile.status === 'applied';
    } else if (filter === 'open-deadline') {
      return profile.status === 'eligible';
    } else {
      return filter ? profile.status === filter : true;
    }
  });

  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
        <div className="container mt-4">
          <h1>Job Profiles</h1>
          <div className="mb-3">
            <label htmlFor="filter">Filter:</label>
            <select
              id="filter"
              className="form-select"
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
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Profile/Designation</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((profile) => (
                <tr
                  key={profile.id}
                  onClick={() => handleProfileClick(profile)}
                  className="profile-row"
                >
                  <td>{profile.company}</td>
                  <td>{profile.name}</td>
                  <td>{profile.type}</td>
                  <td>
                    {profile.status === 'eligible' && (
                      <button
                      className="applyButton"
                      style={{
                        borderRadius: '8px',
                        // backgroundColor: 'transparent',
                        borderWidth: '1px',
                        borderColor: 'rgba(0, 0, 0, 0.453)',
                        transition: 'background-color 0.2s',
                      }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(profile);
                        }}
                      >
                        Apply
                      </button>
                    )}
                    {profile.status === 'ineligible' && (
                      <span className="text-danger">Ineligible</span>
                    )}
                    {profile.status === 'applied' && (
                      <span className="text-success">Applied</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
