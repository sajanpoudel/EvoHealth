import React, { useState } from "react";
import "./login.css"; // Assuming that the CSS is in style.css in the same folder
import HomeHeader from "../views/components/homeheader";
import Dashboard from "../DashBoard/dashboard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function Login() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [logininput, setLogininput] = useState({
    email: "",
    password: "",
  });

  const toggleLogin = () => {
    setIsLogin(true);
  };

  const toggleSignup = () => {
    setIsLogin(false);
  };
  const handleLogin = async () => {
    // Add your login logic here

    try {
      const res = await axios.post(
        "https://evohealth.onrender.com/api/v1/user/login",
        logininput
      );
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.name);
      history.push("/dashboard");
    } catch (error) {
      alert(error.response.data.message);
    }

    // setIsLoggedIn(true);
  };

  const handleSignup = async () => {
    // Add your signup logic here

    try {
      const res = await axios.post(
        "https://evohealth.onrender.com/api/v1/user/register",
        input
      );
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.name);
      history.push("/login");
    } catch (error) {
      alert(error.response.data.message);
    }

    // setIsLoggedIn(true);
  };
  console.log("isLogin:", isLogin);
  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <>
      <HomeHeader />
      <br />
      <br />
      <br />
      <div className="form-modal">
        <div className="form-toggle">
          <button id="login-toggle" onClick={toggleLogin}>
            log in
          </button>
          <button id="signup-toggle" onClick={toggleSignup}>
            sign up
          </button>
        </div>

        {isLogin ? (
          <div id="login-form">
            <form>
              <input
                type="text"
                name="email"
                value={logininput.email}
                onChange={(e) =>
                    setLogininput({
                    ...logininput,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Enter email"
              />
              <input
                type="password"
                name="password"
                value={logininput.password}
                onChange={(e) =>
                    setLogininput({
                    ...logininput,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Enter password"
              />
              <button type="button" className="btn login" onClick={handleLogin}>
                login
              </button>
              <p>
                <a href="#">Forgotten account</a>
              </p>
              <hr />
            </form>
          </div>
        ) : (
          <div id="signup-form" className="show-form">
            <form>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={input.email}
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="text"
                name="username"
                value={input.username}
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Choose username"
              />
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Create password"
              />
              <button
                type="button"
                className="btn signup"
                onClick={handleSignup}
              >
                create account
              </button>
              <p>
                Clicking <strong>create account</strong> means that you agree to
                our <a href="#">terms of services</a>.
              </p>
              <hr />
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
