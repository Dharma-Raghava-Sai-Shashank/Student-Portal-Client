import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPlacementCycles, savePlacementCycle } from "../../Slices/placementcycle";
import { ADMIN } from "../constants";
import { fetchAcadYears } from "../../Slices/academicYear";
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const initialData: PlacementCycle.RootObject = {
  placementCycleName: "",
  type: "",
  acadYear: undefined,
  startDate: "",
  endDate: "",
  graduatingYear: "",
};

const GraduatingYears = ["2023"];

const types = ["placement", "internship"];

export const Cycle = () => {
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();

  const acadYears: AcademicYear.RootObject[] = useAppSelector((state) =>
    state.academicyear.currAcadYear
      ? [state.academicyear.currAcadYear, ...state.academicyear.prevAcadYears]
      : state.academicyear.prevAcadYears
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [placementCycle, setPlacementCycle] =
    useState<PlacementCycle.RootObject>(initialData);

  const cycles = useAppSelector((state) => state.placementcycle);

  React.useEffect(() => {
    dispatch(fetchPlacementCycles({ type: ADMIN }));
    dispatch(fetchAcadYears());
  }, [dispatch]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlacementCycle((prev: PlacementCycle.RootObject) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveCycle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(savePlacementCycle(placementCycle));
    setShow(false);
  }

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
                      name="placementCycleName"
                      value={placementCycle.placementCycleName}
                      onChange={handleOnChange}
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
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <InputLabel id="demo-simple-select-label">
                        Academic Year
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                          placementCycle.acadYear
                            ? placementCycle.acadYear.year
                            : ""
                        }
                        label="Academic Year"
                        onChange={(e: SelectChangeEvent) =>
                          setPlacementCycle(
                            (prev: PlacementCycle.RootObject) => ({
                              ...prev,
                              acadYear: acadYears.find(
                                (item) => item.year === e.target.value
                              ),
                            })
                          )
                        }
                      >
                        {acadYears?.map((item: AcademicYear.RootObject) => {
                          return (
                            <MenuItem value={item?.year} key={item?.year}>
                              {item?.year}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel id="demo-simple-select-label">
                        Graduating Year
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={placementCycle.graduatingYear}
                        label="Graduating Year"
                        onChange={(e: SelectChangeEvent) =>
                          setPlacementCycle(
                            (prev: PlacementCycle.RootObject) => ({
                              ...prev,
                              graduatingYear: e.target.value,
                            })
                          )
                        }
                      >
                        {GraduatingYears?.map((item: any) => {
                          return (
                            <MenuItem value={item} key={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={placementCycle.type}
                        label="Type"
                        onChange={(e: SelectChangeEvent) =>
                          setPlacementCycle(
                            (prev: PlacementCycle.RootObject) => ({
                              ...prev,
                              type: e.target.value,
                            })
                          )
                        }
                      >
                        {types?.map((item: any) => {
                          return (
                            <MenuItem value={item} key={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                  </Grid>

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
                          name="startDate"
                          value={placementCycle.startDate}
                          onChange={handleOnChange}
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
                          name="endDate"
                          value={placementCycle.endDate}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={handleSaveCycle}>Save Changes</Button>
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
              {cycles.ongoing.map((cycle: PlacementCycle.RootObject) => (
                <div className=" mx-3 px-5">
                  <Link
                    to={`/admin/placementcycle/${cycle.placementCycleId}`}
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
                            {cycle.placementCycleName}
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
              {cycles.previous.map((cycle: PlacementCycle.RootObject) => (
                <div className=" mx-3 px-5">
                  <Link
                    to={`/admin/placementcycle/${cycle.placementCycleId}`}
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
                            {cycle.placementCycleName}
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
