import { MotionPhotosAuto } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import "./style.scss";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export const SignIn = () => {
  const [selectedOption, setselectedOption] = useState("signIn");

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
                          placeholder="Create Password"
                          name="createpassword"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <div className="">
                        <input
                          type="password"
                          className="InputSignIn p-3"
                          placeholder="Retype Password"
                          name="retypepassword"
                        />
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
                      <Link to="/company/dashboard">
                        <button
                          // type="submit"
                          className="LoginButton"
                        >
                          Register
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
