import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { students } from "../constants/student";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showCheckbox: boolean;
  stageName: string;
}
interface HeadCell {
  id: string;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "students Name",
  },
  {
    id: "adminNo",
    label: "Admission Number",
  },
];
export const AddstudentsModal = ({
  open,
  setOpen,
  showCheckbox,
  stageName,
}: props) => {
  const handleCloseCourse = () => {
    setOpen(false);
  }
  const handleShowCourse = () => setOpen(true);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [studentInput, setStudentInput] = useState("");
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = students.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleAddStudentToStage = () => {
    const studentInputAdminNumber: readonly string[] = studentInput
      .split("\n")
      .map((n) => n.trim());
    // console.log(studentInputAdminNumber, selected);
    studentInputAdminNumber.map((student) => {
      console.log(!selected.find((person) => person === student));
      if (students.find((item) => item.id === student)) {
        if (!selected.find((person) => person === student)) {
          setSelected((prev) => [...prev, student]);
        }
      } else {
        window.alert(student + " is not in the list");
      }
    });
  };
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  return (
    <div>
      <Modal size="lg" show={open} onHide={handleCloseCourse}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "1.2rem",
                letterSpacing: "0.2rem",
                // fontWeight: "500",
              }}
              className="fw-600"
            >
              Stage: {stageName}
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="coursesModalBody">
            <div className="">
              <div className="branchNameBox">
                <Box sx={{ width: "100%" }}>
                  <Paper sx={{ width: "100%", mb: 2 }}>
                    {selected.length > 0 && (
                      <Typography
                        sx={{
                          flex: "1 1 100%",
                          background: "rgba(25, 118, 210, 0.08)",
                          py: 1,
                          px: 2,
                        }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                      >
                        {selected.length} selected
                      </Typography>
                    )}

                    <div className="me-2 mb-4">
                      <div className="my-2">
                        <Typography variant="button" className="fw-600">
                          Add Students manually
                        </Typography>
                      </div>
                      <TextField
                        id="outlined-textarea"
                        label="Admission  Number"
                        multiline
                        fullWidth
                        onChange={(e) => {
                          setStudentInput(() => e.target.value.toUpperCase());
                        }}
                      />
                      <Button
                        variant="contained"
                        sx={{ my: 3 }}
                        color="success"
                        onClick={() => handleAddStudentToStage()}
                      >
                        Add Students
                      </Button>
                    </div>
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                      >
                        <TableHead>
                          <TableRow>
                            {headCells.map((headCell) => (
                              <TableCell
                                key={headCell.id}
                                align="left"
                                padding="normal"
                              >
                                <Typography
                                  variant="button"
                                  display="block"
                                  gutterBottom
                                >
                                  {headCell.label}
                                </Typography>
                              </TableCell>
                            ))}

                            {showCheckbox && (
                              <TableCell padding="checkbox">
                                <div className="d-flex">
                                  <Checkbox
                                    color="primary"
                                    indeterminate={
                                      selected.length > 0 &&
                                      selected.length < students.length
                                    }
                                    checked={
                                      students.length > 0 &&
                                      selected.length === students.length
                                    }
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                      "aria-label": "select all",
                                    }}
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  />
                                  <Popover
                                    id="mouse-over-popover"
                                    sx={{
                                      pointerEvents: "none",
                                    }}
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "left",
                                    }}
                                    onClose={handlePopoverClose}
                                    disableRestoreFocus
                                  >
                                    <Typography sx={{ p: 1 }}>
                                      Select all branches
                                    </Typography>
                                  </Popover>
                                  {/* <small>Select all</small> */}
                                </div>
                                {/* Select all */}
                              </TableCell>
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {students.map((student, index) => {
                            const isItemSelected = isSelected(student.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={student.id}
                                selected={isItemSelected}
                              >
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                >
                                  {student.name}
                                </TableCell>
                                <TableCell align="left">{student.id}</TableCell>

                                {showCheckbox && (
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                      onClick={(event) =>
                                        handleClick(event, student.id)
                                      }
                                    />
                                  </TableCell>
                                )}
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Box>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseCourse}>Close</Button>
          <Button onClick={handleCloseCourse}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
