import React, {Component} from 'react';
import ProfileImage from './ProfileImage';
import ProfileName from './ProfileName';
import ProfileInformation from './ProfileInformation';
import AcademicInformation from './AcademicInformation';
import PlacementCycle from './PlacementCycle';
import CGPAPlot from './CGPAPlot';
import GradesheetUpdate from './GradesheetUpdate';
import ResumeUpload from './ResumeUpload';


class BasicInfo extends Component {
    render(): React.ReactNode {
        return (
            <div className="student-profile">
                <ProfileImage/>
                <ProfileName/>
                <ProfileInformation/>
                <AcademicInformation/>
                <CGPAPlot/>
                <PlacementCycle/>
                <ResumeUpload/>
                <GradesheetUpdate/>
            </div>
        )
    }
}

export default BasicInfo;


