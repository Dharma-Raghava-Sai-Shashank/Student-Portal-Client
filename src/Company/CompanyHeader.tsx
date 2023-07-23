import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./header.scss";
import { Close, MotionPhotosAuto } from "@mui/icons-material";
import { Typography } from "@mui/material";
interface Props {
  window?: () => Window;
}

export default function CompanyHeader(props: Props) {
  const [openHamburger, setOpenHamburger] = useState(false);
  return (
    <div className="CompanyHeader">
      <header>
        <div>
          <button
            className="hamburger-icon"
            onClick={() => setOpenHamburger(() => true)}
          >
            <MenuIcon />
          </button>
        </div>

        <div className="mx-3 my-2 w-100  d-flex justify-content-center">
          <Typography
            variant="button"
            display="block"
            sx={{ fontSize: "1.5rem" }}
          >
            <MotionPhotosAuto fontSize="large" sx={{ mr: 2 }} />
            Autometa
          </Typography>
        </div>
      </header>
      <div className={`nav ${openHamburger ? " nav-left" : ""}`}>
        <div className="nav-content">
          <div className="ms-4">
            <button
              className="cross-btn "
              onClick={() => setOpenHamburger(() => false)}
            >
              <Close />
              {/* <i className="fa fa-times" aria-hidden="true"></i> */}
            </button>
          </div>
          <ul>
            <li>
              <a href="/company/dashboard"> Home </a>
            </li>
            <li>
              <a href="/company/profile"> Profile</a>
            </li>
            <li>
              <a href="#"> Brochure </a>
            </li>

            <li>
              <a href="/company/contactus"> Contact Us </a>
            </li>
          </ul>
          <ul className="terms-links">
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
