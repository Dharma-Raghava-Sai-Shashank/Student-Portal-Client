import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Language,
  LinkedIn,
  MotionPhotosAuto,
} from "@mui/icons-material";
import { Divider } from "@material-ui/core";

export const Companyfooter = () => {
  return (
    <footer className="grey2b">
      <Container maxWidth="lg">
        <Box py={4}>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center capitalize">
              <Typography
                variant="button"
                sx={{ fontSize: "1rem", textTransform: "capitalize" }}
              >
                Opening Time: Mon to Friday 10 a.m. to 5 p.m.
              </Typography>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center">
              <Typography
                variant="button"
                sx={{ fontSize: "1rem", textTransform: "capitalize" }}
              >
                Contact us: +91 1222847899
              </Typography>
            </div>
          </div>
          <div className="row py-4">
            <div className="col-sm-12 col-md-12 col-lg-6 d-flex justify-content-md-start justify-content-sm-center">
              <div>
                <Typography variant="h6" display="block" sx={{ pb: 2 }}>
                  <MotionPhotosAuto fontSize="large" sx={{ mr: 1 }} />
                  Autometa
                </Typography>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 d-flex justify-content-sm-center justify-content-md-center justify-content-xl-end justify-content-lg-end">
              <div className="row px-0 w-100">
                <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                  <Link
                    to="/company/dashboard"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography className="fw-500">Contact Us</Typography>
                  </Link>
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                  <Link
                    to="/company/dashboard"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography className="fw-500">Our Team</Typography>
                  </Link>
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                  <Link
                    to="/company/dashboard"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography className="fw-500">Brochure</Typography>
                  </Link>
                </div>
              </div>
              {/* <Link to="/company/dashboard">Our Team</Link> */}
            </div>
            <Divider />
            <div className="d-flex justify-content-end">
              <div>
                <Typography display="block">
                  <Tooltip title="Website">
                    <IconButton>
                      <Language />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Facebook page">
                    <IconButton>
                      <Facebook />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Instagram Page">
                    <IconButton>
                      <Instagram />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="LinkedIn Page">
                    <IconButton>
                      <LinkedIn />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </footer>
  );
};
