import React, { useState } from 'react';
import { HeaderStudent } from '../Headers/HeaderStudent';
import { StudentSidebar } from '../Sidebars/StudentSidebar';
import { jobProfileData } from './jobProfileData';
import './styles.css';

export default function JobProfile() {
  const [filter, setFilter] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
                <th>Profile/Designation</th>
                <th>Company</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((profile) => (
                <tr key={profile.id} onClick={() => handleProfileClick(profile)}>
                  <td>{profile.name}</td>
                  <td>{profile.company}</td>
                  <td>{profile.type}</td>
                  <td style={{ cursor: 'pointer' }}>{profile.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedProfile && (
          <div className="container mt-4 center">
            <h1>{selectedProfile.name}</h1>
            {/* <p>Company: {selectedProfile.company}</p>
            <p>Type: {selectedProfile.type}</p>
            <p>Status: {selectedProfile.status}</p> */}
            <h3>Eligibility Criteria:</h3>
            {selectedProfile.eligibilityCriteria.map((criteria) => (
              <div key={criteria.spec.specId}>
                <p>Specialization: {criteria.spec.specName}</p>
                <p>
                  Min LPA: {criteria.minLPA}, Max LPA: {criteria.maxLPA}, CGPA: {criteria.cgpaValue}
                </p>
              </div>
            ))}
            <button className="btn btn-primary">Apply</button> {/* don't know what to do after this route */}
          </div>
        )}
      </div>
    </div>
  );
}
