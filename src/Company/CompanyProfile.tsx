import React, { useEffect, useState } from "react";
import hrimage from "../Images/hrImage.png";
import "./style.scss";
import { Button, Divider, Typography } from "@mui/material";
import CompanyHeader from "./CompanyHeader";
import {
  Edit,
  EditOutlined,
  Language,
  LinkedIn,
  Mail,
  Phone,
} from "@mui/icons-material";

export const CompanyProfile = () => {
  const generateDetails = (detailType: string, detail: string | undefined) => {
    return (
      <div className="row mt-3 ">
        <div className="col-sm-12 col-md-3 col-lg-3">
          <Typography variant="subtitle2" sx={{ color: "gray" }} gutterBottom>
            {detailType}
          </Typography>
        </div>
        <div className="col-sm-12 col-md-9 col-lg-9">
          <Typography variant="body2" sx={{ fontSize: "0.93rem" }} gutterBottom>
            {detail}
          </Typography>
        </div>
      </div>
    );
  };
  return (
    <>
      <CompanyHeader />
      <div className="CompanyProfile py-5 grey2b">
        <div className="bluebox1"></div>
        <div className="bluebox2"></div>
        <div className="row profileRow mt-5 pt-2">
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-0">
            <div className="roundDiv p-3 m-2">
              <div className="d-flex justify-content-center">
                <img src={hrimage} width="200px"></img>
              </div>
              <div className="mt-3 text-center">
                <Typography className="fw-500" display="block">
                  Krittika Barnwal
                </Typography>
                <Typography>Google, India</Typography>
              </div>
              <div className="my-3 d-flex justify-content-between">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#1f385b", px: 3, py: 1, mx: 2 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#1f385b", px: 3, py: 1, mx: 2 }}
                >
                  Contact Us
                </Button>

                {/* <Button variant="contained">Contact Us</Button> */}
              </div>
            </div>
            <div className="roundDiv p-3 m-2">
              <div className="mt-2 mb-4">
                <div className="d-flex justify-content-between">
                  <Typography className="fw-500 blue2" variant="button">
                    Other Information
                  </Typography>
                  <Button
                    variant="text"
                    startIcon={<EditOutlined sx={{ fontSize: "10px" }} />}
                    sx={{ color: "#1f385b" }}
                    className="fs-12 blue2 py-0"
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between my-2">
                  <Phone className="blue2" />
                  <Typography className=" text-left">+91 8970740032</Typography>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <Mail className="blue2" />
                  <Typography className=" text-left">
                    krittika@google.com
                  </Typography>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <LinkedIn className="blue2" />
                  <Typography className=" text-left">
                    krittika-barnwal
                  </Typography>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <Language className="blue2" />
                  <Typography className="text-left">
                    krittika-barnwal
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 px-0">
            <div className="roundDiv p-3 my-2">
              <div className="mt-2 mb-4">
                <div className="d-flex justify-content-between">
                  <Typography className="fw-500 blue2" variant="button">
                    About the company
                  </Typography>
                  <Button
                    variant="text"
                    startIcon={<EditOutlined sx={{ fontSize: "10px" }} />}
                    sx={{ color: "#1f385b" }}
                    className="fs-12 blue2 py-0"
                  >
                    Edit
                  </Button>
                </div>
              </div>
              {generateDetails("Name", "Google")}
              {generateDetails("Sector", "Software/IT")}
              {generateDetails("Website", "careers.google.com")}
              {generateDetails(
                "About",
                "Google LLC is an American multinational technology company focusing on artificial intelligence, online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, and consumer electronics."
              )}
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                <div className="roundDiv p-3 mx-0 mb-2 ">
                  <div className="mt-2 mb-4">
                    <div className="d-flex justify-content-between">
                      <Typography className="fw-500 blue2" variant="button">
                        Primary HR
                      </Typography>
                      <Button
                        variant="text"
                        startIcon={<EditOutlined sx={{ fontSize: "10px" }} />}
                        sx={{ color: "#1f385b" }}
                        className="fs-12 blue2 py-0"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  {generateDetails("Name", "Niket Gupta")}
                  {generateDetails("Phone", "+91 893489284")}
                  {generateDetails("Email Id", "niket@gmail.com")}
                  {generateDetails("LinkedIn", "niket-gupta")}
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="roundDiv p-3 mx-0 mb-2">
                  <div className="mt-2 mb-4">
                    <div className="d-flex justify-content-between">
                      <Typography className="fw-500 blue2" variant="button">
                        Secondary HR
                      </Typography>
                      <Button
                        variant="text"
                        startIcon={<EditOutlined sx={{ fontSize: "10px" }} />}
                        sx={{ color: "#1f385b" }}
                        className="fs-12 blue2 py-0"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  {generateDetails("Name", "Aditya Mishra")}
                  {generateDetails("Phone", "+91 893489284")}
                  {generateDetails("Email Id", "aditya@gmail.com")}
                  {generateDetails("LinkedIn", "aditya-mishra")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
