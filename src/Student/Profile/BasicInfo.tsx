import React, { Component } from "react";
import ProfileImage from "./ProfileImage";
import ProfileName from "./ProfileName";
import ProfileInformation from "./ProfileInformation";
import AcademicInformation from "./AcademicInformation";
import PlacementCycle from "./PlacementCycle";
import CGPAPlot from "./CGPAPlot";
import GradesheetUpdate from "./GradesheetUpdate";
import ResumeUpload from "./ResumeUpload";
import { Divider } from "@mui/material";

class BasicInfo extends Component {
  render(): React.ReactNode {
    return (
      <div className="student-profile p-5 grey2b">
        <div className="bg-white">
          <ProfileImage />
          <ProfileName />
          <Divider />
          <ProfileInformation />
          <AcademicInformation />
          <CGPAPlot />
          <PlacementCycle />
          <ResumeUpload />
          <GradesheetUpdate />
        </div>
      </div>
    );
  }
}

export default BasicInfo;
