import React, { useState } from "react";
import FooterWave from "../../Images/FooterWave.svg";
import "./Auth.scss";
import { adminSignin } from "../../api";
import { useNavigate } from "react-router-dom";

function Auth() {
  const Navigate = useNavigate();

  const [ForgotPassword, setForgotPassword] = useState(false);

  const [authData, setAuthData] = React.useState<User.AuthData>({ email: '', password: '' });

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData((prevData: User.AuthData) => ({ ...prevData, [e.target.name]: e.target.value}));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { token } = await adminSignin(authData);

    localStorage.setItem('token', token);
    localStorage.setItem('userType', 'admin');
    Navigate('/admin');
  }
  return (
    <div className="MainPage">
      <div className="d-flex align-items-center justify-content-center AuthSignIn">
        {ForgotPassword === true ? (
          <div className="SignInBox">
            <div className="SignIn SignInForgot">Forgot Password</div>
            <div className="SignInSubText mt-3 mb-5">
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
                    onClick={() => setForgotPassword(false)}
                  >
                    &#60;&#60; Back to Login
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-center my-3">
                <button type="submit" className="LoginButton">
                  Send Reset Link via Email
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="SignInBox">
            <div className="SignIn">Sign in</div>
            <div className="SignInSubText mt-3 mb-5">
              Sign in and apply for interns and jobs!
            </div>
            <form onSubmit={handleLogin}>
              <div className="d-flex justify-content-center">
                <div className="">
                  <input
                    type="email"
                    className="InputSignIn p-3"
                    placeholder="Enter email"
                    name="email"
                    value={authData.email}
                    onChange={handleAuthChange}
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
                    value={authData.password}
                    onChange={handleAuthChange}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center my-3 ms-2">
                  <input
                    type="checkbox"
                    className="regular-checkbox"
                    id="exampleCheck1"
                  />
                  <label className="RememberMe ms-2">Remember Me</label>
                </div>
                <div className="my-3">
                  <button
                    className="ForgotPassword"
                    onClick={() => setForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-center my-3">
                <button type="submit" className="LoginButton">
                  Login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="footerWave">
        <div>
          <img src={FooterWave} width="100%" alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default Auth;
