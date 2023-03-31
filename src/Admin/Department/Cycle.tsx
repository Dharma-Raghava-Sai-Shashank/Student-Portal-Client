import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Typography from "@mui/material/Typography";
import { NewCycleModal } from "./NewCycleModal";

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
              <NewCycleModal
                heading="Add New Placement Cycle"
                show={show}
                setShow={setShow}
              />
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
