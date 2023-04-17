import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Typography from "@mui/material/Typography";

export const Cycle = () => {
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [opentype, setOpentype] = useState<boolean>(false);
  const [opentypeOption, setOpentypeOption] = useState<string>("");
  return (
    <div className="d-flex justify-content-center w-100">
      <div className="w-100 px-5 py-5 grey2b">
        <div>
          <span className=" fs-14">Admin </span>
          <span className="green1c fw-500 fs-14">| Placement Cycle </span>
        </div>
        <div className="bg-white my-2 shadow-lg position-relative">
          <div className="m-3 p-5 mx-5">
            <div className="">
              <Button
                variant="text"
                color="success"
                sx={{ fontSize: "1.1rem" }}
                onClick={handleShow}
              >
                <CalendarMonthOutlinedIcon fontSize="large" sx={{ mr: 3 }} />
                Add New Placement Cycle
              </Button>
              <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Add New Placement Cycle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="my-3">
                    <label htmlFor="Cycle Name" className="newjobLabel fw-600">
                      Cycle Name
                    </label>
                    <input
                      type="text"
                      className="newjobInput"
                      id="Cycle Name"
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ color: "color: rgba(0, 0, 0, 0.6)" }}
                    >
                      Kindly mention start and end month too (Ex: May – July
                      2022 Pre-final year students of ALL courses)
                    </Typography>
                  </div>
                  <div className="my-3">
                    <label htmlFor="Cycle Name" className="newjobLabel fw-600">
                      Graduating Year
                    </label>
                    <input
                      type="number"
                      className="newjobInput"
                      id="Cycle Name"
                    />
                  </div>
                  <div className="mb-3 dropdownBody">
                    <label htmlFor="Website" className="newjobLabel fw-600">
                      Type
                    </label>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="dropdown-toggle button-select"
                        onClick={() => {
                          setOpentype((prev) => !prev);
                        }}
                      >
                        {opentypeOption === ""
                          ? "Select an Option"
                          : opentypeOption}
                      </button>

                      <ul
                        className={`dropdown-menu ${opentype ? " show" : ""}`}
                      >
                        {["Full Time", "Internship"].map((item) => (
                          <li className="dropdown-item">
                            <button
                              type="button"
                              value={item}
                              className="dropdown-option"
                              onClick={() => {
                                setOpentype(() => false);
                                setOpentypeOption(() => item);
                              }}
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="row">
                      <div className="col-6 px-3">
                        <label
                          htmlFor="StartDate"
                          className="newjobLabel fw-600"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          className="newjobInput"
                          id="StartDate"
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor="EndDate" className="newjobLabel fw-600">
                          End Date
                        </label>
                        <input
                          type="date"
                          className="newjobInput"
                          id="EndDate"
                        />
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={handleClose}>Save Changes</Button>
                </Modal.Footer>
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
                Ongoing Placement Cycle
              </Typography>
              <hr style={{ height: "1.3px", margin: 0 }} />
            </div>
            <div className="pb-4">
              {cycles.map((cycle) => (
                <div className=" mx-3 px-5">
                  <Link
                    to={`/admin/placementcycle/${cycle.id}`}
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
                          sx={{ mr: 3, color: "gray", fontSize: "60px" }}
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
                            {cycle.name}
                          </Typography>
                        </div>
                        <div className="d-flex">
                          <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                          >
                            {cycle.startDate + " - " + cycle.endDate}
                          </Typography>
                        </div>
                      </div>
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="my-3">
            <div className="mx-3 pb-4">
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "1.25rem" }}
                gutterBottom
              >
                Previous Placement Cycle
              </Typography>
              <hr style={{ height: "1.3px", margin: 0 }} />
            </div>
            <div className="pb-4">
              {cycles.map((cycle) => (
                <div className=" mx-3 px-5">
                  <Link
                    to={`/admin/placementcycle/${cycle.id}`}
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
                          sx={{ mr: 3, color: "gray", fontSize: "60px" }}
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
                            {cycle.name}
                          </Typography>
                        </div>
                        <div className="d-flex">
                          <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                          >
                            {cycle.startDate + " - " + cycle.endDate}
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
  );
};
