import React from "react";
import student from './StudentProfile';
import Enrolled from './Enrolled';
import Enroll from './Enroll';

const list:any = []

for(var i=0; i<student.placement_cycle.length; i++) {
    if(student.placement_cycle[i].enrolled=="Yes") {
        list.push(<Enrolled student={student.placement_cycle[i]}/>)
    }
    else if(student.placement_cycle[i].enrolled=="No") {
        list.push(<Enroll student={student.placement_cycle[i]}/>)
    }
}

function PlacementCycleBox() {
    return (
        <>
            {list}
        </>
    )
}

export default PlacementCycleBox;
