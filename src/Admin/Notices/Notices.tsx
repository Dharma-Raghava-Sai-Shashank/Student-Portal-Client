import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { Header1 } from "../Headers/Header1";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EachNotice from "../../Student/Dashboard/EachNotice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNoticeForCycles } from "../../Slices/notice";
import { Autocomplete, Select } from "@mui/material";
import "./styles.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Form } from "react-bootstrap";
import { FormControl, InputLabel, Input, MenuItem , TextField} from "@mui/material";


export const Notices = () => {
  const dispatch = useAppDispatch();


  const notices = useAppSelector((state) => state.notice);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


  React.useEffect(() => {
    dispatch(getNoticeForCycles([4]));
  }, [dispatch]);
  const modules = {
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


  const [newnotices, setNewnotices] = useState("");
  const [show, setShow] = useState(false);


  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <div>
        <div className="d-flex">
          <MainSidebar />
          <div className="w-100">
            <Header1 />
            <div className=" w-100 px-5 py-5 grey2b">
              <div>
                <span className="fs-14">Admin | </span>


                <span className={`fs-14  green1c fw-500`}>Notices</span>
              </div>
              <div className="bg-white my-2 shadow-lg ">
                <div className="my-3">
                  <label htmlFor="Company Name" className="newjobLabel ms-2">
                    Notice description
                  </label>


                  {/* */}
                  <div className="addNotices pe-5">
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
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h4"
                      >
                        Notice Title
                      </Typography>
                      <div>
                      <TextField id="outlined-basic" variant="outlined" size='small' fullWidth/>
                      </div>
                      <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                        Description of Notice
                      </Typography>
                      <div>
                        <ReactQuill
                          theme="snow"
                          value={newnotices}
                          modules={modules}
                          style={{ height: "200px", marginBottom: "150px" }}
                        />
                      </div>
                      <div>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Placement Cycle
                        </Typography>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={0}
                            label="Age"
                          >
                            <MenuItem value={1}>First</MenuItem>
                            <MenuItem value={2}>Second</MenuItem>
                            <MenuItem value={3}>Third</MenuItem>
                            <MenuItem value={4}>Fourth</MenuItem>
                          </Select>
                          <h1> </h1>
                          <Button
                            variant="contained"
                            style={{
                              maxWidth: "20%",
                              maxHeight: "30px",
                              minWidth: "30px",
                              minHeight: "30px",
                            }}
                          >
                            Submit
                          </Button>
                        </FormControl>
                      </div>
                    </Box>
                  </Modal>
                  <div className="row w-100 m-0">
                    <div
                      className="border-right"
                      style={{ backgroundColor: "#dddddd64" }}
                    >
                      {notices?.map((item: Notice.RootObject) => (
                        <EachNotice notice={item} />
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




