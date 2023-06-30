import React from "react";
import './ProfileImage.css';
import student from './StudentProfile';

function ProfileName() {
    return (
        <div>
            <center>
                <h3>
                    <strong>{student.name}</strong>
                </h3>
            </center>
        </div>
    )
}

export default ProfileName;
