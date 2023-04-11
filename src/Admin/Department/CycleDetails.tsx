import React, { useState } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import Typography from "@mui/material/Typography";
import Select from "react-select";
import { Header1 } from "../Headers/Header1";
import { MainSidebar } from "../Sidebars/MainSidebar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { generateDetails } from "../Placement/ShowJob";
import { NewCycleModal } from "./NewCycleModal";
import { generateHeading } from "../Placement/ShowJob";

const cycle = {
  id: 1,
  name: "Full Time Placement (2023 batch)",
  startDate: "15 June 2022",
  endDate: "30 March 2023",
  type: "Placement",
};

export const CycleDetails = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [opentype, setOpentype] = useState<boolean>(false);
  const [opentypeOption, setOpentypeOption] = useState<string>("");
  const params = useParams();
  const cycleId = params.cycleId;

  return (
    <div>
      <div className="d-flex">
        <MainSidebar />
        <div className="w-100">
          <Header1 />
          <>{console.log(cycleId)}</>
          <div className="d-flex justify-content-center w-100">
            <div className="w-100 px-5 py-5 grey2b">
              <div>
                <span className=" fs-14">Admin </span>
                <span className=" fs-14">| Placement Cycle </span>
                <span className="green1c fw-500 fs-14">| Cycle-Name </span>
              </div>
              <div className="bg-white my-2 shadow-lg position-relative">
                <div>
                  <div className="fs-10 py-3 d-flex justify-content-center ">
                    Configure the academic organization of Indian Institute of
                    Technology Indian School of Mines here
                  </div>

                  <hr className="py-0 my-0 mx-4" />
                  <div className="d-flex justify-content-end">
                    <div
                      className="d-flex fs-12"
                      style={{ width: "200px" }}
                    ></div>
                  </div>
                  <div className="mx-5 mt-2 mb-5 ">
                    <div className="d-flex ">
                      <div className="mt-1">
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "1rem" }}
                          gutterBottom
                        >
                          Cycle Details
                        </Typography>
                      </div>
                      <div className="ms-5">
                        <Button
                          sx={{ color: "#00ae57", fontSize: "12px" }}
                          startIcon={
                            <EditOutlinedIcon sx={{ fontSize: "8px" }} />
                          }
                          onClick={handleShow}
                        >
                          Edit
                        </Button>
                        <Modal show={show} onHide={handleClose} size="lg">
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Placement Cycle</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="my-3">
                              <label
                                htmlFor="Cycle Name"
                                className="newjobLabel fw-600"
                              >
                                Cycle Name
                              </label>
                              <input
                                type="text"
                                className="newjobInput"
                                id="Cycle Name"
                              />
                            </div>
                            <div className="mb-3 dropdownBody">
                              <label
                                htmlFor="Website"
                                className="newjobLabel fw-600"
                              >
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
                                  className={`dropdown-menu ${
                                    opentype ? " show" : ""
                                  }`}
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
                                  <label
                                    htmlFor="EndDate"
                                    className="newjobLabel fw-600"
                                  >
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
                      <hr style={{ height: "1.3px", margin: 0 }} />
                    </div>
                    <div>
                      <div className="mt-2 mb-3">
                        {generateDetails("Cycle Name", cycle.name)}
                        {generateDetails("Type", cycle.type)}
                        {generateDetails("Start Date", cycle.startDate)}
                        {generateDetails("End Date", cycle.endDate)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mx-5 mt-2 mb-5">
                      {generateHeading("Select Eligible Degrees")}
                    </div>
                    <div className="mx-5 mt-2 mb-5">
                      {generateHeading("Select Eligible Departments")}
                    </div>
                    <div className="mx-5 mt-2 mb-5">
                      {generateHeading("Select Eligible Specialization")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
