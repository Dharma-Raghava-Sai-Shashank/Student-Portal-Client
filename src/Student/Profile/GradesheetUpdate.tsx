import React from "react";
import "./styles.css";

function GradesheetUpdate() {
    return (
        <div className="placement">
            <h3 style={{}}>Request for gradesheet updation</h3>
            <p>Fill the below form to request for gradesheet updation.</p>
            <form action="">
                <textarea name="message" id="updateGradesheet" rows={2} placeholder="Please mention the details about the error in your gradesheet"></textarea>
                <button type="submit" className="gradesheet">REQUEST UPDATION</button>
            </form>
            <br></br>
        </div>
    )
}

export default GradesheetUpdate;