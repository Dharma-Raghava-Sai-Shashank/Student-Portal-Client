import React from 'react';

function Enrolled(props:any) {
    const student = props.student
    return (
        <div className="placementCycleBox">
            <span className="time">
                {student.start_time} - {student.end_time}
            </span>
            <span className="middle">
                {student.title}<br></br>
                <a href={student.information}>View Details</a>
            </span>
            <span className="right">
                Enrolled
            </span>
        </div>
    )
}

export default Enrolled;