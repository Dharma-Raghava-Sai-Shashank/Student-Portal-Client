import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function CurrentCourse() {
  const branchName = "Electronics & Communication Engineering";
  const degreeName = "B.tech";
  const department = "Electronics Engineering,Department of Engineering";
  const admissionNumber = "19JE0453";
  const passoutYear = "2023";
  const startDate = "Jul 2019";
  const endDate = "Jun 2023";
  const cgpa = "8.80";
  const currentSemester = 3;

  const [newcurrentSemester, setNewCurrentSemester] = useState(currentSemester);
  const [editCourse, setEditCourse] = useState(false);
  const handleEditCourseOpen = () => setEditCourse(true);
  const handleEditCourseClose = () => setEditCourse(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "80vw",
    height: "80vh",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 1,
    borderRadius: "10px",
    p: 4,
    overflowY: "scroll",
  };
  return (
    <div className="col col-lg-8 col-md-8">
      <div>Current/Ongoing Courses</div>
      <hr />
      <div className="branchName"> {branchName}</div>
      <div className="degreeName"> {degreeName}</div>
      <div className="department"> {department}</div>
      <div className="rollAndYear">
        {admissionNumber} | {passoutYear} Passout batch
      </div>
      <div className="startEndDate">
        {startDate}-{endDate}
      </div>
      <div className="CGPA">
        <span className="cgpaHeading">CGPA: </span>
        <span className="cgpa">{cgpa}</span>
      </div>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={handleEditCourseOpen}>
          <EditIcon className="me-2" />
          Edit
        </Button>
        <Button>
          <DownloadIcon className="me-2" />
          Download Marksheet
        </Button>
      </ButtonGroup>
      <Modal
        open={editCourse}
        onClose={handleEditCourseClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default CurrentCourse;
