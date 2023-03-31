import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";

interface props {
  heading: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export const NewCycleModal = ({ heading, show, setShow }: props) => {
  const handleClose = () => setShow(false);
  const [opentype, setOpentype] = useState<boolean>(false);
  const [opentypeOption, setOpentypeOption] = useState<string>("");

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-3">
            <label htmlFor="Cycle Name" className="newjobLabel fw-600">
              Cycle Name
            </label>
            <input type="text" className="newjobInput" id="Cycle Name" />
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
                {opentypeOption === "" ? "Select an Option" : opentypeOption}
              </button>

              <ul className={`dropdown-menu ${opentype ? " show" : ""}`}>
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
                <label htmlFor="StartDate" className="newjobLabel fw-600">
                  Start Date
                </label>
                <input type="date" className="newjobInput" id="StartDate" />
              </div>
              <div className="col-6">
                <label htmlFor="EndDate" className="newjobLabel fw-600">
                  End Date
                </label>
                <input type="date" className="newjobInput" id="EndDate" />
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
  );
};
