import React, {Component} from 'react';
import student from './StudentProfile';
import './styles.css';

class BasicInfo extends Component {

    render(): React.ReactNode {

        const tableContent = [];
        
        for(var i=0; i<student.cgpa.length; i++) {
            tableContent.push(
            <tr>
                <td>{i+1}</td>
                <td>{student.sgpa[i]}</td>
                <td>{student.cgpa[i]}</td>
                <td>{student.backlogs[i]}</td>
            </tr>
            )
        }

        let activeBacklogsContent = <span></span>;
        if(student.active_backlogs==0) {
            activeBacklogsContent = <span style={{"color":"green", "fontSize":"200%", "verticalAlign":"middle"}}>{student.active_backlogs}</span>
        }
        else {
            activeBacklogsContent = <span style={{"color":"red", "fontSize":"200%", "verticalAlign":"middle"}}>{student.active_backlogs}</span>
        }


        return (
            <div>
                <table className="academic-information">
                    <h3>
                        Academic Details
                    </h3>
                    <th>
                        <td>Semester</td>
                        <td>SGPA</td>
                        <td>CGPA</td>
                        <td>Backlogs</td>
                    </th>
                    {tableContent}
                </table>
                <div className="internal">
                    <span className="currentCGPA">
                        <strong style={{"verticalAlign":"middle", "fontSize":"120%"}}>Current CGPA : </strong>
                        <span style={{ "color": "green", "fontSize": "200%", "verticalAlign":"middle"}}>{student.current_cgpa}</span>
                    </span>
                    <span className="activeBacklogs">
                        <strong style={{"verticalAlign":"middle", "fontSize":"120%"}}>Active Backlogs : </strong>
                        {activeBacklogsContent}
                    </span>
                </div>
                <br></br>
            </div>
        )
    }
}

export default BasicInfo;