import { MotionPhotosAuto } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import "./style.scss";
import { Link, } from "react-router-dom";
import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { fetchAllCategories } from "../api/companycategory.service";
import { fetchAllSectors } from "../api/companysector.service";
import { useEffect } from 'react'
import { companySignup } from "../api/auth.service";

export const SignIn = () => {
  const [selectedOption, setselectedOption] = useState("signIn");
  const [categories, setCategories] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [signupStep, setSignupStep] = useState(0);

  const [company, setCompany] = useState({
    name: "",
    website: "",
    category: "None",
    sector: "None"
  });

  const [HR, setHR] = useState({
    hr_name: "",
    email: "",
    contact_number: {
      phonePref: "",
      phone: ""
    },
    designation: "",
    linkedin: ""
  })


  useEffect(() => {
    const setInitially = async () => {
      const categories = (await fetchAllCategories()).categories
      setCategories(categories)
      const sectors = (await fetchAllSectors()).sectors
      setSectors(sectors);
    }
    setInitially();
  }, [])
  useEffect(() => {
    console.log(company)
    console.log(HR);
  })


  const handleSignup = async (e: any) => {
    e.preventDefault();
    const data = {
      name: company.name,
      website: company.website,
      category: parseInt(company.category),
      sector: parseInt(company.sector),
      primary_hr: {
        hr_name: HR.hr_name,
        email: HR.email,
        contact_number: {
          phonePref: HR.contact_number.phonePref,
          phone: HR.contact_number.phone
        },
        designation: HR.designation,
        linkedin: HR.linkedin
      }
    };

    const res = await companySignup(data);
    setSignupStep(2);
  }


  return (
    <div className="SignInCompanyPage">
      <div className="row">
        <div className="animationBackground px-0 col-lg-5 col-xl-5">
          <div className="bg-layer d-flex align-items-center justify-content-center h-100">
            <div className="text-white">
              <div className="d-flex justify-content-center">
                <MotionPhotosAuto fontSize="large" />
                <Typography variant="button" sx={{ fontSize: "1.4rem", ml: 1 }}>
                  Autometa
                </Typography>
              </div>
              <div className="d-flex justify-content-center text-center m-2">
                <div>
                  <div>
                    <Typography
                      variant="subtitle2"
                      className="fw-400 mx-3 mt-2 fs-12 grey2c"
                    >
                      A platform developed by
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="subtitle2"
                      className="fw-400 mx-3 mt-2"
                    >
                      Indian Institute of Technology (IITISM) Dhanbad
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="signInBox col-sm-12 col-md-12 col-lg-7 col-xl-7 grey2b">
          <div className="d-flex justify-content-center AuthSignIn">
            <div>
              <div className="mt-5 mb-4s">
                <div className="d-flex justify-content-center ">
                  <MotionPhotosAuto fontSize="large" />
                  <Typography
                    variant="button"
                    sx={{ fontSize: "1.4rem", mb: 2, ml: 1 }}
                  >
                    Autometa
                  </Typography>
                </div>
                <Divider />
              </div>
              {selectedOption === "forgotPassword" && (
                <div className="SignInBox">
                  <div className="SignIn fw-600 mt-3">
                    <Typography variant="button" sx={{ fontSize: "1.2rem" }}>
                      Forgot Password
                    </Typography>
                  </div>
                  <div className="SignInSubText mt-1 mb-5">
                    Enter your details here
                  </div>
                  <form>
                    <div className="d-flex justify-content-center mt-5">
                      <div className="">
                        <input
                          type="email"
                          className="InputSignIn p-3"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="my-3">
                        <button
                          className="ForgotPassword RememberMe bold"
                          onClick={() => setselectedOption("signIn")}
                        >
                          &#60;&#60; Back to Login
                        </button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center my-3">
                      <Link to="/company/dashboard">
                        <button type="submit" className="LoginButton">
                          Send Reset Link via Email
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              )}
              {selectedOption === "signIn" && (
                <div className="SignInBox">
                  <div className="SignIn fw-600">
                    <Typography variant="button" sx={{ fontSize: "2.5rem" }}>
                      Sign in
                    </Typography>
                  </div>
                  <div className="SignInSubText  mb-5">
                    <Typography variant="subtitle2">
                      Sign in for on-campus recruitment
                    </Typography>
                  </div>
                  <form>
                    <div className="d-flex justify-content-center">
                      <div className="">
                        <input
                          type="text"
                          className="InputSignIn p-3"
                          placeholder="Enter username"
                          name="username"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <div className="">
                        <input
                          type="password"
                          className="InputSignIn p-3"
                          placeholder="Password"
                          name="password"
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="my-3">
                        <button
                          className="ForgotPassword"
                          onClick={() => setselectedOption("forgotPassword")}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="my-3">
                        <button
                          className="ForgotPassword"
                          onClick={() => setselectedOption("signUp")}
                        >
                          New? Register
                        </button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center my-3">
                      <Link to="/company/dashboard">
                        <button
                          // type="submit"
                          className="LoginButton"
                        >
                          Login
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              )}
              {selectedOption === "signUp" && (
                <div>
                  {signupStep === 0 &&
                    <div className="SignInBox">
                      <div className="SignIn fw-600">
                        <Typography variant="button" sx={{ fontSize: "2.5rem" }}>
                          Sign Up
                        </Typography>
                      </div>
                      <div className="SignInSubText  mb-5">
                        <Typography variant="subtitle2">
                          Sign Up for on-campus recruitment
                        </Typography>
                      </div>
                      <form>
                        <div className="d-flex justify-content-center">
                          <div className="">
                            <input
                              type="text"
                              className="InputSignIn p-3"
                              placeholder="Company Name"
                              name="companyname"
                              value={company.name}
                              onChange={(e) => setCompany((pre) => { return { ...pre, name: e.target.value } })}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                          <div className="">
                            <input
                              type="text"
                              className="InputSignIn p-3"
                              placeholder="Website"
                              name="website"
                              value={company.website}
                              onChange={(e) => setCompany((pre) => { return { ...pre, website: e.target.value } })}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                          <div className="">
                            <Select
                              labelId="category"
                              id="category"
                              value={company.category}
                              label="Select Category"
                              onChange={(e) => setCompany((pre) => { return { ...pre, category: (e.target.value) } })}
                            >
                              <MenuItem value={"None"}>Select Category</MenuItem>
                              {categories.map(({ categoryId, categoryName }) => (
                                <MenuItem value={categoryId}>{categoryName}</MenuItem>
                              ))}
                            </Select>
                          </div>
                          <div className="">
                            <Select
                              labelId="sector"
                              id="sector"
                              value={company.sector}
                              label="Select Sector"
                              onChange={(e) => setCompany((pre) => { return { ...pre, sector: (e.target.value) } })}
                            >
                              <MenuItem value={"None"}>Select Sector</MenuItem>
                              {sectors.map(({ sectorId, sectorName }) => (
                                <MenuItem value={sectorId}>{sectorName}</MenuItem>
                              ))}
                            </Select>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <div className="my-3">
                            <button
                              className="ForgotPassword"
                              onClick={() => setselectedOption("signIn")}
                            >
                              Already have an account? Login
                            </button>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center my-3">

                          <button
                            // type="submit"
                            className="LoginButton"
                            onClick={() => setSignupStep(1)}
                          >
                            Next
                          </button>

                        </div>
                      </form>
                    </div>
                  }
                  {
                    signupStep === 1 &&
                    <div className="SignInBox">
                      <div className="SignIn fw-600">
                        <Typography variant="button" sx={{ fontSize: "2.5rem" }}>
                          Sign Up
                        </Typography>
                      </div>
                      <div className="SignInSubText  mb-5">
                        <Typography variant="subtitle2">
                          Provide Primary HR Details
                        </Typography>
                      </div>
                      <div className="d-flex justify-content-center my-3">
                        <button
                          // type="submit"
                          className="LoginButton"
                          onClick={() => setSignupStep(0)}
                        >
                          Back
                        </button>

                      </div>
                      <form>
                        <div className="d-flex justify-content-center">
                          <div className="">
                            <input
                              type="text"
                              className="InputSignIn p-3"
                              placeholder="HR Name"
                              name="hrname"
                              value={HR.hr_name}
                              onChange={(e) => setHR((pre) => { return { ...pre, hr_name: e.target.value } })}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                          <div className="">
                            <input
                              type="email"
                              className="InputSignIn p-3"
                              placeholder="email"
                              name="email"
                              value={HR.email}
                              onChange={(e) => setHR((pre) => { return { ...pre, email: e.target.value } })}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                          <div className="">
                            <input
                              type="text"
                              className="InputSignIn p-3"
                              placeholder="Country Code"
                              name="conuntrycode"
                              value={HR.contact_number.phonePref}
                              onChange={(e) => setHR((pre) => { return { ...pre, contact_number: { ...pre.contact_number, phonePref: e.target.value } } })}
                            />
                          </div>
                          <div className="">
                            <input
                              type="text"
                              className="InputSignIn p-3"
                              placeholder="Phone Number"
                              name="phonenumber"
                              value={HR.contact_number.phone}
                              onChange={(e) => setHR((pre) => { return { ...pre, contact_number: { ...pre.contact_number, phone: e.target.value } } })}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <div className="">
                            <input
                              type="text"
                              className="InputSignIn p-3"
                              placeholder="Designation"
                              name="designation"
                              value={HR.designation}
                              onChange={(e) => setHR((pre) => { return { ...pre, designation: e.target.value } })}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <div className="">
                            <input
                              type="text"
                              className="InputSignIn p-3"
                              placeholder="Linkedin Profile"
                              name="linkedin"
                              value={HR.linkedin}
                              onChange={(e) => setHR((pre) => { return { ...pre, linkedin: e.target.value } })}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center my-3">
                          <button
                            // type="submit"
                            className="LoginButton"
                            onClick={handleSignup}
                          >
                            Submit
                          </button>

                        </div>
                      </form>
                    </div>
                  }
                  {
                    signupStep === 2 &&
                    <div>
                      <h1>Successfully Registered</h1>
                      <h1>We have sent Verification Link to {HR.email}. <br /> Click on the sent link to Verify and Login to Dashboard`</h1>
                    </div>
                  }
                </div>

              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
