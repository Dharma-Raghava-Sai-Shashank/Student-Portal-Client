import React from "react";
import Avatar from "@mui/material/Avatar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { branches } from "../constants/branches";
import "./style.scss";

interface props {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  session: string;
  id: string;
  setSession: React.Dispatch<React.SetStateAction<string>>;
}
export const ShowJob = ({
  option,
  setOption,
  session,
  setSession,
  id,
}: props) => {
  const generateDetails = (detailType: string, detail: string) => {
    return (
      <div className="row mt-3 border-bottom">
        <div className="col-3">
          <Typography
            className=""
            variant="subtitle2"
            sx={{ color: "gray" }}
            gutterBottom
          >
            {detailType}
          </Typography>
        </div>
        <div className="col-9">
          <Typography variant="body2" sx={{ fontSize: "0.93rem" }} gutterBottom>
            {detail}
          </Typography>
        </div>
      </div>
    );
  };
  const generateHeading = (heading: string) => {
    return (
      <div>
        <Typography
          className=""
          variant="subtitle2"
          sx={{ fontSize: "1rem" }}
          gutterBottom
        >
          {heading}
        </Typography>
        <hr style={{ height: "1.3px", margin: 0 }} />
      </div>
    );
  };
  return (
    <div>
      <div>
        <div className="row pt-2">
          <div className="col-3  my-5">
            <div className="d-flex justify-content-center">
              <Avatar
                className={"doctorcolor"}
                aria-label="recipe"
                sx={{ width: 120, height: 120 }}
              >
                <ApartmentIcon sx={{ fontSize: "80px" }} />
              </Avatar>
            </div>
          </div>
          <div className="col-9 my-5">
            <Box sx={{ width: "100%", maxWidth: 500 }}>
              <div className="ms-1">
                <Typography variant="h4" gutterBottom>
                  Google
                </Typography>
                <Typography variant="button" className="me-3" display="block">
                  Software Developer
                </Typography>
                <div className="mb-2">
                  <Typography variant="button">Bangalore, Noida</Typography>
                </div>
              </div>
              <Chip label={session} variant="outlined" />
            </Box>
          </div>
        </div>
        <Divider />
        <div className="row">
          <div className="col-3 border-right d-flex justify-content-center py-5">
            <div>
              <div>
                <Button
                  variant="text"
                  color="success"
                  sx={{ p: 0, textTransform: "capitalize" }}
                >
                  View application
                </Button>
              </div>
              <div>
                <Button
                  variant="text"
                  color="success"
                  sx={{ p: 0, textTransform: "capitalize" }}
                >
                  View application
                </Button>
              </div>
              <div>
                <Button
                  variant="text"
                  color="success"
                  sx={{ p: 0, textTransform: "capitalize" }}
                >
                  View application
                </Button>
              </div>
              <div>
                <Button
                  variant="text"
                  color="success"
                  sx={{ p: 0, textTransform: "capitalize" }}
                >
                  View application
                </Button>
              </div>
              <div>
                <Button
                  variant="text"
                  color="success"
                  sx={{ p: 0, textTransform: "capitalize" }}
                >
                  View application
                </Button>
              </div>
            </div>
          </div>

          <div className="col-9 border p-4">
            <div>
              <div className="mb-5">
                {generateHeading("Company Details")}
                <div className="mt-2 mb-3">
                  {generateDetails("Company Name", "Google")}
                  {generateDetails("Placement Cycle", session)}
                  {generateDetails("Website", "careers.google.com")}
                  {generateDetails("Category", "E-Commerece")}
                </div>
              </div>
              <div className="mb-5">
                {generateHeading("Job Details")}
                <div className="mt-2 mb-3">
                  {generateDetails("Designation", "Software Developer")}
                  {generateDetails("Place of Posting", "Bangalore")}
                  {generateDetails(
                    "Job Description",
                    "consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."
                  )}
                  {generateDetails("Category", "E-Commerece")}
                </div>
              </div>
              <div className="mb-5">
                {generateHeading("Salary Details")}
                <div className="mt-2 mb-3">
                  {generateDetails("CTC (in lpa)", "Rs 35,00,000")}
                  {generateDetails(
                    "CTC breakup",
                    "Base Salary: Rs 22,00,000 Stock: Rs 13,00,000"
                  )}
                  {generateDetails(
                    "Bond Details",
                    "consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."
                  )}
                  {generateDetails("Category", "E-Commerece")}
                </div>
              </div>
              <div className="mb-5">
                <div>{generateHeading("Eligible Courses and Disciplines")}</div>
                <div className="mt-2 mb-3">
                  <div className="showSelectectedCourse ">
                    <div className="row showSelectectedCourseDegree">
                      <div className="col-1 degreeDiv pt-5">
                        <div className="">
                          <div className="">
                            <div className="DegreeName"> M.Tech</div>
                            <div className="DegreeYear"> 2-years</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-11 showSelectectedCourseBranch mt-3">
                        <Box sx={{ width: "100%" }}>
                          <Paper sx={{ width: "100%", mb: 2, p: 3 }}>
                            <div className="row  showSelectectedCourseHeading">
                              <div className="col-5">Department</div>
                              <div className="col-5">Branch</div>
                              <div className="col-2">CGPA Cutoff</div>
                            </div>
                            <div>
                              {branches.map((row, index) => (
                                <div>
                                  <div className="row">
                                    <div className="col-5">&bull; {row}</div>
                                    <div className="col-5">{row}</div>
                                    <div className="col-2">8.5</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Paper>
                        </Box>
                      </div>
                    </div>
                    <div className="row showSelectectedCourseDegree">
                      <div className="col-1 degreeDiv pt-5">
                        <div className="">
                          <div className="">
                            <div className="DegreeName"> B.Tech</div>
                            <div className="DegreeYear"> 4-years</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-11 showSelectectedCourseBranch mt-3">
                        <Box sx={{ width: "100%" }}>
                          <Paper sx={{ width: "100%", mb: 2, p: 3 }}>
                            <div className="row  showSelectectedCourseHeading">
                              <div className="col-5">Department</div>
                              <div className="col-5">Branch</div>
                              <div className="col-2">CGPA Cutoff</div>
                            </div>
                            <div>
                              {branches.map((row, index) => (
                                <div>
                                  <div className="row">
                                    <div className="col-5">&bull; {row}</div>
                                    <div className="col-5">{row}</div>
                                    <div className="col-2">8.5</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Paper>
                        </Box>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
