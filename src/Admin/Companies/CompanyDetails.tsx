import React from "react";
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
// import { ShowJob } from "../Placement/ShowJob";
// import { Dayjs } from "dayjs";
import { fetchCompanyById, fetchCompanyHRs, fetchCompanyNFs } from "../../api";

// import "./style.scss";

interface allNFInCycle {
  applicationid: number;
  designation: string;
  placementCycleId: number;
  placementCycleName: string;
}
// const Schedule = [
//   {
//     id: "892b",
//     StageName: "Resume SL",
//     StageMode: "Virtual",
//     StageDate: "22/04/2022",
//   },
//   {
//     id: "882b",
//     StageName: "Reasoning",
//     StageMode: "Virtual",
//     StageDate: "22/04/2022",
//   },
//   {
//     id: "881b",
//     StageName: "Interview 1",
//     StageMode: "On Campus",
//     StageDate: "22/04/2022",
//   },
//   {
//     id: "812b",
//     StageName: "Group Discussion",
//     StageMode: "Virtual",
//     StageDate: "22/04/2022",
//   },
// ];
// const html = (
//   <div>
//     <h1>This is a webpage.</h1>
//     <h2>Why do I have to check this??</h2>
//     <p>
//       <br />
//     </p>
//     <p>Because whatever.</p>
//     <p>
//       <strong>Pros:</strong>
//     </p>
//     <ol>
//       <li>
//         <strong>checking</strong>
//       </li>
//       <li>
//         <strong>seeing if it works</strong>
//       </li>
//     </ol>
//   </div>
// );
// const NFIncycle: allNFInCycle[] = [
//   { applicationid: "329jkawqsdh", designation: "Software Developer" },
//   { applicationid: "329jkdnbcjsh", designation: "System Engineer" },
//   { applicationid: "329jkasasxdh", designation: "Machine Learning" },
// ];

export const CompanyDetails = () => {
  const params = useParams();
  const companyId = parseInt(params.companyId as string);
  const [company, setCompany] = React.useState<Company.Response>();
  const [companyHRs, setCompanyHRs] = React.useState<Company.HR[]>([]);
  const [NFIncycle, setNFIncycle] = React.useState<allNFInCycle[]>([]);
  const [placementCycles, setPlacementCycles] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchCompany = async () => {
      const { company } = await fetchCompanyById(companyId);
      const { HRs } = await fetchCompanyHRs(companyId);
      const { NFs } = await fetchCompanyNFs(companyId);
      setCompany(company);
      setCompanyHRs(HRs);
      setNFIncycle(NFs);
      NFs.map((nf: Company.NF) => {
        if (!placementCycles?.includes(nf.placementCycleName))
          setPlacementCycles([...placementCycles, nf.placementCycleName]);
        return nf;
      });
    };
    fetchCompany();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateDetails = (detailType: string, detail: string | number) => {
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
    allNF = allNF.filter(
      (nf: allNFInCycle) => nf.placementCycleName === cycleName
    );
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

              <span className={`fs-14  green1c fw-500`}>
                {company?.companyName || ""}
              </span>
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
                          {company?.companyName || ""}
                          {/* <>{console.log(companyId.companyId)}</> */}
                        </Typography>
                        <Typography
                          variant="button"
                          className="me-3"
                          display="block"
                        >
                          {company?.categoryName || ""}
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
                          {generateDetails("Company Name", company?.companyName || "")}
                          {generateDetails("Company Id", companyId)}
                          {generateDetails("Website", company?.companyWebsite || "")}
                          {generateDetails("Category", company?.categoryName || "")}
                        </div>
                      </div>
                      <div className="mb-5">
                        {generateHeading("All Application")}
                        <div className="mt-2 mb-3">
                          {placementCycles.map((cycle: string) =>
                            generateCycleDetails(cycle, NFIncycle)
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="mb-5">
                          {generateHeading("HR Details")}
                          {companyHRs.map((hr: Company.HR) => {
                            return (
                              <div className="mt-2 mb-5">
                                {generateDetails(
                                  "HR Name",
                                  hr.hrContactName
                                )}
                                {generateDetails("Phone Number(s)", hr.phones)}
                                {generateDetails(
                                  "Email ID(s)",
                                  hr.emails
                                )}
                                {generateDetails("LinkedIn", hr.linkedin)}
                                {generateDetails("Validity Status", hr.validityState)}
                              </div>
                            );
                          })}
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
