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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { fetchAcadYears, saveAcadYear } from "../../Slices/academicYear";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export const AcadYearProgram = () => {
  const [show, setShow] = useState(false);
  const [showOngoing, setShowOngoing] = useState(false);
  const [inputdeadlineTime, setInputDeadlineTime] = React.useState<any>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseOngoing = () => setShowOngoing(false);
  const handleShowOngoing = () => setShowOngoing(true);

  const prevAcadYears = useAppSelector(
    (state) => state.academicyear.prevAcadYears
  );
  const currAcadYear = useAppSelector(
    (state) => state.academicyear.currAcadYear
  );
  const [ongoing, setOngoing] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOngoing(event.target.value as string);
  };

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAcadYears());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSaveAcademicYear = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    inputdeadlineTime &&
      dispatch(
        saveAcadYear({
          year: `${inputdeadlineTime?.["$y"] - 1}-${inputdeadlineTime?.["$y"]}`,
        })
      );

    setShow(false);
  };
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
                      <Button onClick={handleSaveAcademicYear}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              <div>
                <div className="mx-2 mt-2 mb-5 pt-4 ">
                  <div className="d-flex justify-content-between mt-1">
                    <div className="mx-2">
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: "1.25rem" }}
                        gutterBottom
                      >
                        Ongoing Academic Year
                      </Typography>
                    </div>
                    <div className="ms-5">
                      <Button
                        sx={{ color: "#00ae57", fontSize: "12px" }}
                        startIcon={
                          <EditOutlinedIcon sx={{ fontSize: "8px" }} />
                        }
                        onClick={handleShowOngoing}
                      >
                        Edit
                      </Button>
                      <Modal
                        show={showOngoing}
                        onHide={handleCloseOngoing}
                        size="lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            Change Ongoing Academic Year
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="my-3">
                            <label
                              htmlFor="Cycle Name"
                              className="newjobLabel fw-600"
                            >
                              Select Academic Year
                            </label>
                            <Box sx={{ minWidth: 120, my: 3 }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Select
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={ongoing}
                                  label="Select"
                                  onChange={handleChange}
                                >
                                  {prevAcadYears.map(
                                    (acadYear: AcademicYear.RootObject) => (
                                      <MenuItem value={acadYear.year}>
                                        {acadYear?.year}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </Box>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={handleCloseOngoing}>Close</Button>
                          <Button onClick={handleCloseOngoing}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                  <hr style={{ height: "1.3px", margin: 0 }} />
                </div>
                {/* <div className="mx-3 pb-4">
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "1.25rem" }}
                    gutterBottom
                  >
                    Ongoing Academic Year
                  </Typography>
                  <hr style={{ height: "1.3px", margin: 0 }} />
                </div> */}
                <div className="pb-4">
                  <div className=" mx-3 px-5">
                    <Link
                      to={`/admin/programs/${currAcadYear?.year}`}
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
                              {currAcadYear?.year}
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
                  {prevAcadYears.map((acadYear: AcademicYear.RootObject) => (
                    <div className=" mx-3 px-5" key={acadYear?.year}>
                      <Link
                        to={`/admin/programs/${acadYear?.year}`}
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
                                {acadYear?.year}
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
