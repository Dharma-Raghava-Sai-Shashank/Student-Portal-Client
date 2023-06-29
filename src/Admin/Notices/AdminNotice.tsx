import React, { useRef, useState } from "react";
import { Card, CardHeader, CardContent, Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Menu,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";
import { Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { convertStringToHTML } from "../../Student/Dashboard/EachNotice";
import { NoticeCardStyle } from "../../Student/Dashboard/EachNotice";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { BoxStyle } from "./Notices";
import { QuillModules } from "./Notices";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchPlacementCycles } from "../../Slices/placementcycle";
import { ADMIN } from "../constants";

interface props {
  notice: Notice.RootObject;
}

export default function AdminNotice({ notice }: props) {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [ModalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleModalOpen = () => {
    setAnchorEl(() => null);
    setModalOpen(true);
  };

  const cycles = useAppSelector((state) => state.placementcycle);
  const [EditNotice, setEditNotice] = useState<Notice.RootObject>(notice);
  React.useEffect(() => {
    dispatch(fetchPlacementCycles({ type: ADMIN }));
  }, [dispatch]);

  const OnSubmit = async () => {
    console.log(EditNotice);
    handleModalClose();
  };
  const handleDelete = async () => {
    console.log(EditNotice);
    window.alert("Are you sure you want to delete this notice");
    handleClose();
    handleModalClose();
  };

  return (
    <div className="d-flex justify-content-center my-3 ">
      <Card sx={NoticeCardStyle}>
        <CardHeader
          sx={{ px: 3 }}
          avatar={<Avatar sx={{ mt: 1, backgroundColor: "#1976d2" }}>R</Avatar>}
          title={
            <Typography
              className="title-responsive fw-500"
              variant="body2"
              sx={{ fontSize: "1.15rem", mt: 2 }}
            >
              {notice?.title}
            </Typography>
          }
          subheader={
            <div className=" me-1 subHeader-responsive">
              <div>
                Prof. Debjani Maam
                {notice.updatedAt !== notice.createdAt && (
                  <p>&#x2022; ( Edited )</p>
                )}
              </div>
              <div className="">
                Posted on:{"  "}
                {moment(notice?.updatedAt).format(`Do MMMM, YYYY    hh:mm a`)}
                {"  ( " +
                  moment(notice?.updatedAt).startOf("hour").fromNow() +
                  " )"}
              </div>
            </div>
          }
          action={
            <div>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon sx={{ mt: 2 }} />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: "15ch",
                  },
                }}
              >
                <MenuItem onClick={handleModalOpen}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
              <Modal
                open={ModalOpen}
                onClose={handleModalClose}
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
                        value={EditNotice.placementCycleId}
                        label="Select Cycle"
                        name="placementCycleId"
                      >
                        {cycles.previous.map(
                          (cycle: PlacementCycle.RootObject) => (
                            <MenuItem
                              value={cycle.placementCycleId}
                              onClick={() => {
                                setEditNotice((prev: Notice.RootObject) => ({
                                  ...prev,
                                  placementCycleId: cycle.placementCycleId,
                                }));
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
                      value={EditNotice.title}
                      onChange={(e) => {
                        setEditNotice((prev: Notice.RootObject) => ({
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
                      value={EditNotice?.description}
                      modules={QuillModules}
                      style={{ height: "250px" }}
                      onChange={(value) => {
                        setEditNotice((prev: Notice.RootObject) => ({
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
                          onClick={handleModalClose}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="col-6 d-flex justify-content-end">
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={OnSubmit}
                        >
                          Make Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
          }
        />
        <CardContent className="mx-3">
          <div>{convertStringToHTML(notice.description)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
