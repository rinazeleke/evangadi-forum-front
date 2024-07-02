import React, { useRef, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios/axiosConfig";
import { UserContext } from "../../context/UserContext";
import { ClipLoader } from "react-spinners";
import "./account.css";

function LandingPage() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [userData, setUserData] = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailRef.current.value;
    const passValue = passwordRef.current.value;

    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post("api/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("Login successful");

      localStorage.setItem("auth-token", data.token);

      setUserData({
        token: data.token,
        user: data.user,
        config: {
          headers: { "x-auth-token": data.token },
        },
      });

      navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 col-12 col-sm-6">
          <div className="authfy-login">
            <div className="authfy-panel panel-login text-center  active">
              <div className="authfy-heading">
                <h3 className="auth-title">Login to your account</h3>
                <p>
                  Don’t have an account?{" "}
                  <Link to="/register" className="lnk-toggler small-text">
                    Create a new account
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group  mb-3">
                  <input
                    ref={emailRef}
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group  mb-3">
                  <input
                    ref={passwordRef}
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>

                {isLoading ? (
                  <div className="text-center">
                    <ClipLoader color="#00BFFF" size={50} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3">
                    Submit
                  </button>
                )}
              </form>

              <div className="mt-3">
                <Link to="/register" className="small-text">
                  Create an account ?
                </Link>
              </div>
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

export default LandingPage;
