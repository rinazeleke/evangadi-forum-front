import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios/axiosConfig";
import ClipLoader from "react-spinners/ClipLoader";
import "./account.css";

function SignUp() {
  const navigate = useNavigate();
  const userNameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = userNameRef.current.value.trim();
    const firstname = firstNameRef.current.value.trim();
    const lastname = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !firstname || !lastname || !email || !password) {
      setError("Please provide all required information.");
      return;
    }

    if (!agree) {
      setError("You must agree to the privacy policy and terms of service.");
      return;
    }

    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await axios.post("api/users/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });

      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 col-12 col-sm-6">
          <div className="authfy-login">
            <div className="authfy-panel panel-signup text-center active">
              <div className="authfy-heading">
                <h3 className="auth-title">Join the network</h3>
                <p>
                  Already have an account?
                  <Link
                    className="lnk-toggler small-text"
                    data-panel=".panel-login"
                    to="/login">
                    Sign in
                  </Link>
                </p>
              </div>
              <div className="ajax-return"></div>
              <form
                onSubmit={handleSubmit}
                name="signupForm"
                className="signupForm"
                method="POST">
                <div className="form-group wrap-input mb-2">
                  <input
                    ref={emailRef}
                    type="email"
                    className="form-control eva_email"
                    name="eva_email"
                    placeholder="Email address"
                  />
                  <span className="focus-input"></span>
                </div>

                <div className="row">
                  <div className="col-lg-6 no-padding">
                    <div className="form-group wrap-input mb-2">
                      <input
                        ref={firstNameRef}
                        type="text"
                        className="form-control eva_firstname"
                        name="eva_firstname"
                        placeholder="First name"
                      />
                      <span className="focus-input"></span>
                    </div>
                  </div>
                  <div className="col-lg-6 no-padding">
                    <div className="form-group wrap-input mb-2">
                      <input
                        ref={lastNameRef}
                        type="text"
                        className="form-control eva_lastname"
                        name="eva_lastname"
                        placeholder="Last name"
                      />
                      <span className="focus-input"></span>
                    </div>
                  </div>
                </div>

                <div className="form-group wrap-input mb-2">
                  <input
                    ref={userNameRef}
                    type="text"
                    className="form-control eva_username"
                    name="eva_username"
                    placeholder="Username"
                  />
                  <span className="focus-input"></span>
                </div>

                <div className="form-group wrap-input mb-2">
                  <div className="pwdMask">
                    <input
                      ref={passwordRef}
                      type="password"
                      className="form-control eva_password"
                      name="eva_password"
                      placeholder="Password"
                    />
                    <span className="focus-input"></span>
                    <span
                      className="fa fa-eye-slash pwd-toggle"
                      aria-hidden="true"></span>
                  </div>
                </div>
                <div className="form-group mb-1">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreeCheck"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="agreeCheck">
                      I agree to the{" "}
                      <Link
                        to="/legal/privacy/"
                        target="_blank"
                        className="small-text">
                        privacy policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/legal/terms/"
                        target="_blank"
                        className="small-text">
                        terms of service
                      </Link>
                      .
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    disabled={loading}>
                    {loading ? (
                      <ClipLoader
                        size={20}
                        color={"#ffffff"}
                        loading={loading}
                      />
                    ) : (
                      "Agree and Join"
                    )}
                  </button>
                </div>
              </form>{" "}
              <Link
                className="lnk-toggler small-text"
                data-panel=".panel-login"
                to="/login">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 d-none d-md-block">
          <div className="padd-text fadeInLeft">
            <small className="small-text">About</small>
            <h2 className="title-h2">Evangadi Networks Q&A</h2>
            <p className="font-p mg-bt-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              condimentum mauris at libero lobortis, sed placerat magna
              vulputate.
            </p>
            <p className="font-p mg-bt-10">
              Phasellus nec risus at ligula volutpat eleifend. Donec in ligula
              nulla. Nullam sit amet turpis nec ante congue rhoncus non vitae
              ex. Aenean at arcu dapibus, gravida tortor id,
            </p>
            <p className="font-p mg-bt-10">
              Maecenas tristique eleifend efficitur. Quisque egestas turpis non
              purus gravida, id euismod odio efficitur. Fusce non velit non
              nulla dictum tincidunt.
            </p>
            <a href="/explained/" className="btn btn-blue">
              How it works
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
