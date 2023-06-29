import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { Header1 } from "../Headers/Header1";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNoticeForCycles } from "../../Slices/notice";
import { Select } from "@mui/material";
import "./styles.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { ADMIN } from "../constants";
import { fetchPlacementCycles } from "../../Slices/placementcycle";
import { createNotice } from "../../api/notice.service";
import AdminNotice from "./AdminNotice";

export const BoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
export const QuillModules = {
  toolbar: [
    [{ header: [false] }],
    ["bold", "italic", "underline"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
};

export const Notices = () => {
  const dispatch = useAppDispatch();

  const prevnotices = useAppSelector((state) => state.notice);
  const cycles = useAppSelector((state) => state.placementcycle);
  const [newnotices, setNewnotices] = useState<Notice.RootObject>({
    title: "",
    description: "",
    placementCycleId: 0,
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const OnSubmit = async () => {
    await createNotice(newnotices.placementCycleId as number, {
      ...newnotices,
      description: `<Typography>${newnotices.description}</Typography>`,
    });
  };
  const OnClearAll = () => {
    setNewnotices((prev: Notice.RootObject) => ({
      ...prev,
      title: "",
      description: "",
      placementCycleId: 0,
    }));
  };

  React.useEffect(() => {
    dispatch(getNoticeForCycles([1, 2, 3, 4, 5, 6]));
    dispatch(fetchPlacementCycles({ type: ADMIN }));
  }, [dispatch]);

  return (
    <div>
      <div>
        <div className="d-flex">
          <MainSidebar />
          <div className="w-100">
            <Header1 />
            <div className=" w-100 px-5 py-5 grey2b">
              <div className="my-2">
                <div className="my-3">
                  <div className="addNotices pe-5 me-5">
                    <Fab
                      color="primary"
                      aria-label="add"
                      variant="extended"
                      sx={{ px: 2 }}
                      onClick={handleOpen}
                    >
                      <AddIcon sx={{ mr: 2 }} /> Add New Notice
                    </Fab>
                  </div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={BoxStyle}>
                      <div>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Placement Cycle
                        </Typography>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newnotices.placementCycleId}
                            label="Select Cycle"
                            name="placementCycleId"
                          >
                            {cycles.previous.map(
                              (cycle: PlacementCycle.RootObject) => (
                                <MenuItem
                                  value={cycle.placementCycleId}
                                  onClick={() => {
                                    setNewnotices(
                                      (prev: Notice.RootObject) => ({
                                        ...prev,
                                        placementCycleId:
                                          cycle.placementCycleId,
                                      })
                                    );
                                  }}
                                >
                                  {cycle.placementCycleName}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </div>
                      <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                        Notice Title
                      </Typography>
                      <div>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="title"
                          value={newnotices.title}
                          onChange={(e) => {
                            setNewnotices((prev: Notice.RootObject) => ({
                              ...prev,
                              title: e.target.value,
                            }));
                          }}
                        />
                      </div>
                      <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                        Description of Notice
                      </Typography>
                      <div className="mb-5 pb-3">
                        <ReactQuill
                          theme="snow"
                          value={newnotices?.description}
                          modules={QuillModules}
                          style={{ height: "250px" }}
                          onChange={(value) => {
                            setNewnotices((prev: Notice.RootObject) => ({
                              ...prev,
                              description: value,
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <div className="row">
                          <div className="col-6">
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="outlined"
                              color="info"
                              onClick={OnClearAll}
                              sx={{ ml: 3 }}
                            >
                              Clear All
                            </Button>
                          </div>
                          <div className="col-6 d-flex justify-content-end">
                            <Button
                              variant="outlined"
                              color="success"
                              onClick={OnSubmit}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                  <div className="row w-100 m-0">
                    <div
                      className="border-right"
                      style={{ backgroundColor: "inherit" }}
                    >
                      {prevnotices?.map((item: Notice.RootObject) => (
                        <AdminNotice notice={item} />
                      ))}
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
