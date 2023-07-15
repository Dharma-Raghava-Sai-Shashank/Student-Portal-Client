import React, { useEffect, useState } from "react";
import FooterWave from "../../Images/FooterWave.svg";
import "./Auth.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../Slices/auth";
import { clearMessage } from "../../Slices/message";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function Auth() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn, role } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const [ForgotPassword, setForgotPassword] = useState(false);

  const [authData, setAuthData] = React.useState<User.AuthData>({ username: '', password: '' });

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData((prevData: User.AuthData) => ({ ...prevData, [e.target.name]: e.target.value}));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = authData;
    setLoading(true);

    dispatch(login({ username, password, type: 'student' }))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigate("/student/dashboard");
      })
      .catch(() => {
        setLoading(false);
      });
  };

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
                    type="text"
                    className="InputSignIn p-3"
                    placeholder="Enter username"
                    name="username"
                    value={authData.username}
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
                <button type="submit" className="LoginButton" disabled={loading}>
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
