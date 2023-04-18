import React, { useState } from "react";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { Header1 } from "../Headers/Header1";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Typography from "@mui/material/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { YearCalendar } from "@mui/x-date-pickers";

export const AcadYearProgram = () => {
  const cycles = [
    {
      id: 1,
      name: "Full Time Placement (2023 batch)",
      startDate: "15 June 2022",
      endDate: "30 March 2023",
      type: "Placement",
    },
    {
      id: 1,
      name: "Internshp (2024 batch)",
      startDate: "15 August 2022",
      endDate: "30 March 2023",
      type: "Placement",
    },
    {
      id: 1,
      name: "6 month Internship (2023 batch)",
      startDate: "15 November 2022",
      endDate: "30 March 2023",
      type: "Placement",
    },
  ];
  const [show, setShow] = useState(false);
  const [inputdeadlineTime, setInputDeadlineTime] =
    React.useState<Dayjs | null>();
  //   const [deadlineTime, setDeadlineTime] = React.useState<Dayjs | null>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [opentype, setOpentype] = useState<boolean>(false);
  const [opentypeOption, setOpentypeOption] = useState<string>("");
  return (
    <div className="d-flex">
      <MainSidebar />
      <div className="w-100">
        <Header1 />
        <div className="d-flex justify-content-center">
          <div className=" w-100 px-5 py-5 grey2b">
            <div>
              <span className="fs-14">Admin | </span>
              <span className="fs-14 green1c fw-500">Programs</span>
            </div>
            <div className="bg-white my-2 shadow-lg ">
              <div className="d-flex justify-content-between border-bottom">
                <div className="fs-18 px-3 py-2 fw-500 my-2">
                  Select Academic Year
                </div>
              </div>
              <div className="m-3 p-5 mx-5">
                <div className="">
                  <Button
                    variant="text"
                    color="success"
                    sx={{ fontSize: "1.1rem" }}
                    onClick={handleShow}
                  >
                    <CalendarMonthOutlinedIcon
                      fontSize="large"
                      sx={{ mr: 3 }}
                    />
                    Add New Academic Year
                  </Button>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    sx={{ width: "500px" }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Add New Academic Year</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="my-3">
                        <label
                          htmlFor="Cycle Name"
                          className="newjobLabel fw-600"
                        >
                          Academic Year
                        </label>
                        <div className="my-4">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                label={"Select Year"}
                                sx={{ width: "450px" }}
                                views={["year"]}
                                value={inputdeadlineTime}
                                onChange={(newValue) =>
                                  setInputDeadlineTime(newValue)
                                }
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleClose}>Close</Button>
                      <Button onClick={handleClose}>Save Changes</Button>
                    </Modal.Footer>
                    // check
                  </Modal>
                </div>
              </div>
              <div>
                <div className="mx-3 pb-4">
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "1.25rem" }}
                    gutterBottom
                  >
                    Ongoing Academic Year
                  </Typography>
                  <hr style={{ height: "1.3px", margin: 0 }} />
                </div>
                <div className="pb-4">
                  <div className=" mx-3 px-5">
                    <Link
                      to={`/admin/programs/2023`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <Button
                        variant="text"
                        color="inherit"
                        sx={{
                          px: 5,
                          py: 3,
                          fontSize: "1.1rem",
                        }}
                      >
                        <div className="me-4">
                          <CalendarMonthOutlinedIcon
                            sx={{ mr: 2, color: "gray", fontSize: "40px" }}
                          />
                        </div>
                        <div className="mt-2">
                          <div className="d-flex">
                            <Typography
                              variant="h6"
                              sx={{
                                letterSpacing: "0.1rem",
                                textTransform: "capitalize",
                              }}
                            >
                              2023
                            </Typography>
                          </div>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="my-3">
                <div className="mx-3 pb-4">
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "1.25rem" }}
                    gutterBottom
                  >
                    Previous Academic Years
                  </Typography>
                  <hr style={{ height: "1.3px", margin: 0 }} />
                </div>
                <div className="pb-4">
                  {["2021", "2022"].map((year) => (
                    <div className=" mx-3 px-5">
                      <Link
                        to={`/admin/programs/${year}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <Button
                          variant="text"
                          color="inherit"
                          sx={{
                            px: 5,
                            py: 3,
                            fontSize: "1.1rem",
                          }}
                        >
                          <div className="me-4">
                            <CalendarMonthOutlinedIcon
                              sx={{ mr: 2, color: "gray", fontSize: "40px" }}
                            />
                          </div>
                          <div className="mt-2">
                            <div className="d-flex">
                              <Typography
                                variant="h6"
                                sx={{
                                  letterSpacing: "0.1rem",
                                  textTransform: "capitalize",
                                }}
                              >
                                {year}
                              </Typography>
                            </div>
                          </div>
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
