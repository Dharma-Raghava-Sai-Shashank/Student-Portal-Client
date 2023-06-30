import React from 'react';
import Icon from './PDFIcon.svg';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

function ResumeBox() {
    return (
        <div className="resume-box">
            <span className="resume-image">
                <img src={Icon} />
            </span>
            <span className="resume-text">
                <span className="resume-title">Resume Title</span>
                <span className="resume-secondline">Uploaded at 6 April,2023</span> 
            </span>
            <span className="element">
                <DeleteIcon style={{"marginRight" : "20%"}}/>  
                <DownloadIcon/> 
            </span>       
        </div>
    )
}

export default ResumeBox;