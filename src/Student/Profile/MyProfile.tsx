import React, { useState, useRef } from "react";
import "./MyProfile.scss";
import student from "./StudentProfile";
import { Button, Divider, Typography } from "@mui/material";
import List from "@mui/material/List";
import Fab from "@mui/material/Fab";
import ListIcon from "@mui/icons-material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Drawer from "@mui/material/Drawer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { APIRequest } from "../../api/index"
import { baseURL } from "../../api/index"

const generateHeading = (heading: string) => {
  return (
    <div>
      <Typography variant="body1" sx={{ fontSize: "1.3rem" }} gutterBottom>
        {heading}
      </Typography>
      <hr style={{ height: "1.3px", margin: 0 }} />
    </div>
  );
};
const generateDetails = (detailType: string, detail: string | undefined) => {
  return (
    <div className="row mt-3 border-bottom">
      <div className="col-sm-12 col-md-3 col-lg-3">
        <Typography variant="subtitle2" sx={{ color: "gray" }} gutterBottom>
          {detailType}
        </Typography>
      </div>
      <div className="col-sm-12 col-md-9 col-lg-9">
        <Typography variant="body2" sx={{ fontSize: "0.93rem" }} gutterBottom>
          {detail}
        </Typography>
      </div>
    </div>
  );
};
const listItems = [
  "Personal Details",
  "Current Education",
  "Education History",
  "Additional Info",
  "Uploaded Resumes",
  "Placement Enrollments",
];

interface ApiResponse {
  success: boolean;
  student_profile: {
    admno: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    phonePref: string;
    phone: string;
    dob: string;
    gender: string;
    instiMailId: string;
    personalMailId: string;
    isPWD: number;
    category: string;
    isEWS: number;
    permissions: number;
    uidType: string;
    uidValue: string;
    isRegistered: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    graduatingYear: {
      year: string;
    };
    cvs: {
      cvId: number;
      cvLink: string;
    }[];
    placementcycles: {
      placementCycleId: number;
      admno: string;
    }[];
    specializations: {
      study_id: number;
      isParent: number;
      marksheetLink: string;
      cgpaValue: number;
      cgpaScale: number;
      totalBacklogs: number;
      activeBacklogs: number;
    }[];
    edu_historys: {
      eduHistoryId: number;
      marksheetLink: string;
      cgpaValue: number;
      cgpaScale: number;
      gradeEquivalent: string;
      percentEquivalent: number;
      conversionProof: string;
      startYearMonth: string;
      endYearMonth: string;
      institution: string;
      university: string;
      lastEditDate: string;
      lastVerifiedDate: string;
      isFrozen: number;
      degreeId: number;
      degreeName: string;
    }[];
    semwise_gpas: any[];
  };
}

export const MyProfile = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState<ApiResponse | null>(null);

  let class10info = {};
  let class12info = {};

  React.useEffect(()=> {
    (async () => {
      try {
        // const response = await APIRequest("https://student-portal-server-2sbh.onrender.com/api/student/profile", 'GET');
        const response = await APIRequest(`${baseURL}/student/profile`, 'GET')
        if (response.success) {
          const a = response;
          setStudentProfile(a);
        } else {
          console.error('API request failed:', response.message);
        }
      } catch (error) {
        console.error('Error occurred during API request:', error);
      }
    })();
  },[])

  const handleDrawerOpen = () => {
    setDrawerOpen(() => true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(() => false);
  };
  const scrollToItem = (id: string) => {
    document
      .querySelector(`#id${id}`)
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const DrawerList = () => {
    return (
      <div>
        {listItems.map((list, index) => (
          <List key={index}>
            <ListItem
              disablePadding
              onClick={() => {
                handleDrawerClose();
                setTimeout(() => (scrollToItem(index.toString()), 1000));
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <FormatListBulletedIcon color="info" />
                </ListItemIcon>
                <ListItemText primary={list} />
              </ListItemButton>
            </ListItem>
          </List>
        ))}
      </div>
    );
  };
  if (!studentProfile?.student_profile.admno) {
    return <p>Loading...</p>;
  }
  return (
    <div className="MyProfileMainDiv grey2b w-100">
      <div
        className="responsiveTimelineButton"
        style={{ position: "fixed", bottom: "80px", right: "30px" }}
      >
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          sx={{ px: 2}}
          onClick={handleDrawerOpen}
        >
          <ListIcon />
        </Fab>
        <Drawer anchor="bottom" open={drawerOpen} onClose={handleDrawerClose}>
          {DrawerList()}
        </Drawer>
      </div>
      <div className="greenBackground"></div>
      <div>
        <div className="profileImage">
          <img className="profile_image" src={student.image}></img>
        </div>
        <div className="BasicInfo">
          <div className="d-flex justify-content-center text-center">
            <div>
              <div className="mt-4 mb-3">
                <Typography
                  variant="h5"
                  className="capitalize"
                  sx={{ letterSpacing: "2px" }}
                >
                  {studentProfile.student_profile.first_name} {studentProfile.student_profile.middle_name} {studentProfile.student_profile.last_name}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="body1"
                  className="capitalize"
                  color="#616161"
                  fontSize={"1rem"}
                  display="block"
                >
                  Admission Number: {studentProfile.student_profile.admno}
                </Typography>
                <Typography
                  variant="body1"
                  className="capitalize mt-3"
                  color="#616161"
                  fontSize={"1.2rem"}
                  display="block"
                >
                  Course: {student.course}
                </Typography>
                <Typography
                  variant="body1"
                  className="capitalize"
                  color="#616161"
                  fontSize={"1rem"}
                  display="block"
                >
                  Department: {student.department}
                </Typography>
                <Typography
                  variant="body1"
                  className="capitalize"
                  color="#616161"
                  fontSize={"1rem"}
                  display="block"
                >
                  Specialization: {student.specialization}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 py-4">
          <div className="bg-white pb-4 mb-4">
            <div className="row">
              <div className="col-lg-3 my-4 ps-2 p-0 responsiveTimeline">
                {DrawerList()}
              </div>
              <div className="col-sm-12 col-md-9 col-lg-9">
                <div id="id0" className="m-3 p-3">
                  {generateHeading("Personal Details")}
                  <div>
                    {generateDetails("Date of Birth", studentProfile.student_profile.dob)}
                    {generateDetails(
                      "Graduating Year",
                      studentProfile.student_profile.graduatingYear.year
                    )}
                    {generateDetails("Gender", studentProfile.student_profile.gender)}
                    {generateDetails("Category", studentProfile.student_profile.category)}
                    {generateDetails("Contact Number", studentProfile.student_profile.phone)}
                    {generateDetails(
                      "College Email Id",
                      studentProfile.student_profile.instiMailId
                    )}

                    {generateDetails(
                      "Personal Email Id",
                      studentProfile.student_profile.personalMailId
                    )}
                    {generateDetails(
                      "Current Address",
                      "D-155, Amber Hostel, IITISM Dhanbad - Jharkhand, 826004"
                    )}
                    {generateDetails(
                      "Permanent Address",
                      "D-155, Amber Hostel, IITISM Dhanbad - Jharkhand, 826004"
                    )}
                  </div>
                </div>
                <div id="id1" className="m-3 p-3">
                  {generateHeading("Current Education")}
                  <div>
                    {generateDetails("Date of Birth", studentProfile.student_profile.dob)}
                    {generateDetails(
                      "Graduating Year",
                      studentProfile.student_profile.graduatingYear.year
                    )}
                    {generateDetails("Gender", studentProfile.student_profile.gender)}
                    <div className="my-3">
                      <div className="mt-4">
                        <Typography variant="button" className="capitalize">
                          Table:
                        </Typography>
                      </div>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Semester </TableCell>
                              {student.cgpa.map((cgpa, index) => (
                                <TableCell align="center" key={index}>
                                  Semester {index + 1}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow
                              key="SGPA"
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                SGPA
                              </TableCell>
                              {student.sgpa.map((gpa, index) => (
                                <TableCell align="center" key={index}>
                                  {gpa}
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow
                              key="SGPA"
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                CGPA
                              </TableCell>
                              {student.cgpa.map((gpa, index) => (
                                <TableCell align="center" key={index}>
                                  {gpa}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </div>
                <div id="id2" className="m-3 p-3">
                  {generateHeading("Education History")}
                  <div>
                    <div className="mt-4">
                      <Typography variant="button" className="capitalize">
                        Class 12th:
                      </Typography>
                    </div>
                    {generateDetails("Start Period", studentProfile.student_profile.edu_historys[1].startYearMonth)}
                    {generateDetails(
                      "End Period", studentProfile.student_profile.edu_historys[1].endYearMonth
                    )}
                    {generateDetails("Institution", studentProfile.student_profile.edu_historys[1].institution)}
                    {generateDetails("University", studentProfile.student_profile.edu_historys[1].university)}
                    {generateDetails("CGPA Value", String(studentProfile.student_profile.edu_historys[1].cgpaValue))}
                    {generateDetails("CGPA Scale", String(studentProfile.student_profile.edu_historys[1].cgpaScale))}
                    {generateDetails("Grade Equivalent", String(studentProfile.student_profile.edu_historys[1].gradeEquivalent))}
                    {generateDetails("Percent Equivalent", String(studentProfile.student_profile.edu_historys[1].university))}
                    <div className="mt-4">
                      <Typography variant="button" className="capitalize">
                        Class 10th:
                      </Typography>
                    </div>
                    {generateDetails("Start Period", studentProfile.student_profile.edu_historys[0].startYearMonth)}
                    {generateDetails(
                      "End Period", studentProfile.student_profile.edu_historys[0].endYearMonth
                    )}
                    {generateDetails("Institution", studentProfile.student_profile.edu_historys[0].institution)}
                    {generateDetails("University", studentProfile.student_profile.edu_historys[0].university)}
                    {generateDetails("CGPA Value", String(studentProfile.student_profile.edu_historys[0].cgpaValue))}
                    {generateDetails("CGPA Scale", String(studentProfile.student_profile.edu_historys[0].cgpaScale))}
                    {generateDetails("Grade Equivalent", String(studentProfile.student_profile.edu_historys[0].gradeEquivalent))}
                    {generateDetails("Percent Equivalent", String(studentProfile.student_profile.edu_historys[0].university))}
                  </div>
                </div>
                <div id="id3" className="m-3 p-3">
                  {generateHeading("Additional Info")}
                  <div>
                    {generateDetails("Date of Birth", student.date_of_birth)}
                    {generateDetails(
                      "Graduating Year",
                      student.graduating_year
                    )}
                    {generateDetails("Gender", student.gender)}
                    {generateDetails("Category", "General")}
                    {generateDetails("Contact Number", "+91 7379392201")}
                    {generateDetails(
                      "College Email Id",
                      "suyash@mnc.iitism.ac.in"
                    )}

                    {generateDetails(
                      "Personal Email Id",
                      "suyash@gmail.com"
                    )}
                    {generateDetails(
                      "Current Address",
                      "D-155, Amber Hostel, IITISM Dhanbad - Jharkhand, 826004"
                    )}
                    {generateDetails(
                      "Permanent Address",
                      "D-155, Amber Hostel, IITISM Dhanbad - Jharkhand, 826004"
                    )}
                    {/* {generateDetails("", )}
                {generateDetails("", )} */}
                  </div>
                </div>
                <div id="id4" className="m-3 p-3">
                  {generateHeading("Uploaded Resume")}
                  <div>
                    {generateDetails("Date of Birth", student.date_of_birth)}
                    {generateDetails(
                      "Graduating Year",
                      student.graduating_year
                    )}
                    {generateDetails("Gender", student.gender)}
                    {generateDetails("Category", "General")}
                    {generateDetails("Contact Number", "+91 7379392201")}
                    {generateDetails(
                      "College Email Id",
                      "suyash@mnc.iitism.ac.in"
                    )}

                    {generateDetails(
                      "Personal Email Id",
                      "suyash@gmail.com"
                    )}
                    {generateDetails(
                      "Current Address",
                      "D-155, Amber Hostel, IITISM Dhanbad - Jharkhand, 826004"
                    )}
                    {generateDetails(
                      "Permanent Address",
                      "D-155, Amber Hostel, IITISM Dhanbad - Jharkhand, 826004"
                    )}
                    {/* {generateDetails("", )}
                {generateDetails("", )} */}
                  </div>
                </div>
                <div id="id5" className="m-3 p-3">
      {/* Generate Heading function */}
      {generateHeading("Placement Enrollments")}
      <Paper sx={{ width: '100%', mt: 2, p: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography variant="body1">May 2023 - May 2024</Typography>
          </div>
          <div
            style={{
              borderLeft: '1px solid green',
              height: '80px',
              margin: '0 16px',
              opacity: '0.4',
            }}
          />
          <div>
            <Typography variant="body1">Internship Placement for 2023-24 (2025 Passout)</Typography>
            <Button>View Details</Button>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Button variant="contained" sx={{ bgcolor: '#00ae57', color: '#fff', borderRadius: '18px' }}>
              Enrolled <span style={{ marginLeft: '0.5rem' }}>&#10003;</span>
            </Button>
          </div>
        </div>
      </Paper>
      <Paper sx={{ width: '100%', mt: 2, p: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography variant="body1">Aug 2020 - Aug 2040</Typography>
          </div>
          <div
            style={{
              borderLeft: '1px solid green',
              height: '80px',
              margin: '0 16px',
              opacity: '0.4',
            }}
          />
          <div>
            <Typography variant="body1">Superset Placements</Typography>
            <Button>View Details</Button>
          </div>
          <div style={{ marginLeft: 'auto'}}>
            <Button variant="contained" sx={{  color: '#fff', borderRadius: '18px', mr: 1 }}>
              Proceed
            </Button>
          </div>
        </div>
      </Paper>
    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
