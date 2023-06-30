import React, {Component} from 'react';
import student from './StudentProfile';
import './styles.css';

class BasicInfo extends Component {
    render(): React.ReactNode {
        return (
            <div className="basic-details">
                    <table>
                        <th>
                            <h3>Basic Details</h3>
                        </th>
                        <tr>
                            <td className="heading">Admission Number</td>
                            <td className="output">{student.admission_number}</td>
                        </tr>
                        <tr>
                            <td className="heading">Course</td>
                            <td className="output">{student.course}</td>
                        </tr>
                        <tr>
                            <td className="heading">Department</td>
                            <td className="output">{student.department}</td>
                        </tr>
                        <tr>
                            <td className="heading">Date of Birth</td>
                            <td className="output">{student.date_of_birth}</td>
                        </tr>
                        <tr>
                            <td className="heading">Gender</td>
                            <td className="output">{student.gender}</td>
                        </tr>
                        <tr>
                            <td className="heading">Graduating Year</td>
                            <td className="output">{student.graduating_year}</td>
                        </tr>
                    </table>
            </div>
        )
    }
}

export default BasicInfo;