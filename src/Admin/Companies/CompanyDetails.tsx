import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Avatar from "@mui/material/Avatar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Header1 } from "../Headers/Header1";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { ShowJob } from "../Placement/ShowJob";
import { Dayjs } from "dayjs";

// import "./style.scss";

interface allNFInCycle {
  applicationid: string;
  designation: string;
}
const Schedule = [
  {
    id: "892b",
    StageName: "Resume SL",
    StageMode: "Virtual",
    StageDate: "22/04/2022",
  },
  {
    id: "882b",
    StageName: "Reasoning",
    StageMode: "Virtual",
    StageDate: "22/04/2022",
  },
  {
    id: "881b",
    StageName: "Interview 1",
    StageMode: "On Campus",
    StageDate: "22/04/2022",
  },
  {
    id: "812b",
    StageName: "Group Discussion",
    StageMode: "Virtual",
    StageDate: "22/04/2022",
  },
];
const html = (
  <div>
    <h1>This is a webpage.</h1>
    <h2>Why do I have to check this??</h2>
    <p>
      <br />
    </p>
    <p>Because whatever.</p>
    <p>
      <strong>Pros:</strong>
    </p>
    <ol>
      <li>
        <strong>checking</strong>
      </li>
      <li>
        <strong>seeing if it works</strong>
      </li>
    </ol>
  </div>
);
const NFIncycle: allNFInCycle[] = [
  { applicationid: "329jkawqsdh", designation: "Software Developer" },
  { applicationid: "329jkdnbcjsh", designation: "System Engineer" },
  { applicationid: "329jkasasxdh", designation: "Machine Learning" },
];

export const CompanyDetails = () => {
  const params = useParams();
  const companyId: string = params.companyId as string;

  const generateDetails = (detailType: string, detail: string) => {
    return (
      <div className="row mt-3 border-bottom mx-2">
        <div className="col-3 ">
          <Typography variant="subtitle2" sx={{ color: "gray" }} gutterBottom>
            {detailType}
          </Typography>
        </div>
        <div className="col-9">
          <Typography variant="body2" sx={{ fontSize: "0.93rem" }} gutterBottom>
            {detail}
          </Typography>
        </div>
      </div>
    );
  };
  const generateHeading = (heading: string) => {
    return (
      <div>
        <Typography variant="subtitle2" sx={{ fontSize: "1rem" }} gutterBottom>
          {heading}
        </Typography>
        <hr style={{ height: "1.3px", margin: 0 }} />
      </div>
    );
  };
  const generateCycleDetails = (cycleName: string, allNF: allNFInCycle[]) => {
    return (
      <div className="row mt-3 border-bottom mx-2">
        <div className="col-3 ">
          <Typography variant="subtitle2" sx={{ color: "gray" }} gutterBottom>
            {cycleName}
          </Typography>
        </div>
        <div className="col-9">
          <Typography
            variant="body2"
            sx={{ fontSize: "0.93rem", pb: 2 }}
            gutterBottom
          >
            {allNF.map((item) => (
              <Link
                to={`/admin/placement/$(item.applicationId)`}
                style={{ textDecoration: "none" }}
                className="cursor-pointer"
              >
                <Chip
                  label={item.designation}
                  variant="outlined"
                  sx={{ mr: 2 }}
                />
              </Link>
            ))}
          </Typography>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="d-flex">
        <MainSidebar />
        <div className="w-100">
          <Header1 />
          {/* <div>HI{console.log(params.companyId)}</div> */}
          <div className=" w-100 px-5 py-5 grey2b">
            <div>
              <span className="fs-14">Companies | </span>

              <span className={`fs-14  green1c fw-500`}>Google</span>
            </div>
            <div className="bg-white my-2 shadow-lg ">
              <div>
                <div className="row pt-2">
                  <div className="col-3  my-5">
                    <div className="d-flex justify-content-center">
                      <Avatar
                        className={"doctorcolor"}
                        aria-label="recipe"
                        sx={{ width: 120, height: 120 }}
                      >
                        <ApartmentIcon sx={{ fontSize: "80px" }} />
                      </Avatar>
                    </div>
                  </div>
                  <div className="col-9 my-5">
                    <Box sx={{ width: "100%", maxWidth: 500 }}>
                      <div className="ms-1">
                        <Typography variant="h4" gutterBottom>
                          Google
                          {/* <>{console.log(companyId.companyId)}</> */}
                        </Typography>
                        <Typography
                          variant="button"
                          className="me-3"
                          display="block"
                        >
                          Software/IT
                        </Typography>
                      </div>
                    </Box>
                  </div>
                </div>
                <Divider />
                <div className="">
                  <div className="border p-3">
                    <div>
                      <div className="mb-5">
                        {generateHeading("Company Details")}
                        <div className="mt-2 mb-3">
                          {generateDetails("Company Name", "Google")}
                          {generateDetails("Company Id", companyId)}
                          {generateDetails("Website", "careers.google.com")}
                          {generateDetails("Category", "E-Commerece")}
                        </div>
                      </div>
                      <div className="mb-5">
                        {generateHeading("All Application")}
                        <div className="mt-2 mb-3">
                          {generateCycleDetails("Full Time 2023-34", NFIncycle)}
                          {generateCycleDetails("Intern 2023-34", NFIncycle)}
                        </div>
                      </div>

                      <div>
                        <div className="mb-5">
                          {generateHeading("HR Details")}

                          <div className="mt-2 mb-5">
                            {generateDetails(
                              "Primary HR Name",
                              "Krittika Barnwal"
                            )}
                            {generateDetails("Phone Number", "8278928092")}
                            {generateDetails(
                              "Email ID",
                              "abss.fkkejfci@jd.com"
                            )}
                          </div>
                          <div className="mt-2 mb-5">
                            {generateDetails(
                              "Secondary HR Name",
                              "Harry Potter"
                            )}
                            {generateDetails("Phone Number", "8278928092")}
                            {generateDetails(
                              "Email ID",
                              "abss.fkkejfci@jd.com"
                            )}
                          </div>
                        </div>
                      </div>
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
