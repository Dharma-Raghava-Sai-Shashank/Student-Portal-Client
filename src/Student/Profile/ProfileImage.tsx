import React from "react";
import './ProfileImage.css';
import student from './StudentProfile';

function ProfileImage() {
    return (
        <div className="student-image">
            <img className = "profile_image" src = {student.image}></img>
        </div>
    )
}

export default ProfileImage;