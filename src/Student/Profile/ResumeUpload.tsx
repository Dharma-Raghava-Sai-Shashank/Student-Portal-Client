import React from "react";
import './styles.css';
import ResumeBox from './ResumeBox';
import student from './StudentProfile';

function ResumeUpload() {
    return (
        <div className="placement">
            <h3 style={{ "borderBottom": "1px solid black" }}>Resume</h3>
            <ResumeBox/>
        </div>
    )
}
export default ResumeUpload;

