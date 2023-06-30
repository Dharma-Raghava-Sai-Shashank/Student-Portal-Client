import React from 'react';

function Enroll(props:any) {
    const student = props.student;
    return (
        <div className="placementCycleBox">
            <span className="time">
                {student.start_time} - {student.end_time} 
            </span>
            <span className="middle">
                {student.title}<br></br>
            </span>
            <a href={student.enroll}><span className="right-enroll">
                Enroll
            </span></a>
        </div>
    )
}

export default Enroll;