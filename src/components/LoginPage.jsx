import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import ReCAPTCHA from "react-google-recaptcha";

//SCSS Imports
import "./scss/loginpage.scss";

function LoginPage() {
  const history = useHistory();

  //State variables
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const [errorState = 0, setErrorState] = useState(0);
  const [errorMessage, setErrorMessage] = useState(0);

  const login = (e) => {
    //Prevent the default behaviour of event (button onclick refresh)
    e.preventDefault();

    //Log in
    auth
      //Use firebase email and password method
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      //Once logged in, use history.push to return to index page.
      .then((auth) => {
        alert("Welcome " + auth.user.email);
        history.push("/");
      })
      //If login fails, show alert message
      .catch((e) => {
        //alert(e.message);

        if (e.message === "The email address is badly formatted.") {
          setErrorState(1);
          setErrorMessage("Invalid email address.");
        } else if (
          e.message ===
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          setErrorState(1);
          setErrorMessage("User not found.");
        } else if (
          e.message ===
          "The password is invalid or the user does not have a password."
        ) {
          setErrorState(2);
          setErrorMessage("Invalid password.");
        }
      });
  };

  const register = (e) => {
    e.preventDefault();

    if (registerPassword !== registerConfirmPassword) {
      setErrorState(6);
      setErrorMessage("Passwords do not match.");
      return;
    }

    auth
      .createUserWithEmailAndPassword(registerEmail, registerPassword)
      .then((auth) => {
        alert("Welcome" + auth.user.name);
        history.push("/");
      })
      .catch((e) => {
        //alert(e.message);

        if (e.message === "The email address is badly formatted.") {
          setErrorState(4);
          setErrorMessage("Please enter a valid email address.");
        } else if (
          e.message === "The password must be 6 characters long or more."
        ) {
          setErrorState(5);
          setErrorMessage("Password must be at least 6 characters.");
        } else if (
          e.message ===
          "The email address is already in use by another account."
        ) {
          setErrorState(4);
          setErrorMessage("Email address already in use.");
        }
      });
  };

  return (
    <div className="login-page">
      <h3>Existing User?</h3>
      <h2>Login</h2>
      <form className="login-page-login-form" action="">
        <fieldset>
          <label htmlFor="login-email">Email Address:</label>
          <input
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            type="email"
            name="login-email"
            id="login-email"
          />
          <p className="login-form-error-message">
            {errorState === 1 ? errorMessage : ""}
          </p>
          <label htmlFor="login-password">Password:</label>
          <input
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            type="password"
            name="login-password"
            id="login-password"
          />
          <p className="login-form-error-message">
            {errorState === 2 ? errorMessage : ""}
          </p>
          <button type="submit" onClick={login}>
            Log In
          </button>
          <p className="login-form-error-message">
            {errorState === 3 ? errorMessage : ""}
          </p>
        </fieldset>
      </form>
      <h4>Or</h4>
      <h4>Log in with Google</h4>

      <hr />
      <h3>New Users</h3>
      <h2>Register</h2>
      <form className="login-page-register-form">
        <fieldset>
          <label htmlFor="register-email">Email Address:</label>
          <input
            value={registerEmail}
            onChange={(event) => setRegisterEmail(event.target.value)}
            type="email"
            name="register-email"
            id="register-email"
          />
          <p className="login-form-error-message">
            {errorState === 4 ? errorMessage : ""}
          </p>
          <label htmlFor="register-first-name">First Name:</label>
          <input
            type="name"
            name="register-first-name"
            id="register-first-name"
          />
          <label htmlFor="register-last-name">Last Name:</label>
          <input
            type="name"
            name="register-last-name"
            id="register-last-name"
          />
          <label htmlFor="register-password">Enter a Password:</label>
          <input
            value={registerPassword}
            onChange={(event) => setRegisterPassword(event.target.value)}
            type="password"
            name="register-password"
            id="register-password"
          />
          <p className="login-form-error-message">
            {errorState === 5 ? errorMessage : ""}
          </p>
          <label htmlFor="register-reenter-password">Re-enter Password:</label>
          <input
            value={registerConfirmPassword}
            onChange={(event) => setRegisterConfirmPassword(event.target.value)}
            type="password"
            name="register-reenter-password"
            id="register-reenter-password"
          />
          <p className="login-form-error-message">
            {errorState === 6 ? errorMessage : ""}
          </p>
          <label htmlFor="register-birthday">Birth Date:</label>
          <input type="date" name="register-birthday" id="register-birthday" />
          {/* <ReCAPTCHA
            sitekey=""
            onChange
          /> */}
          <button type="submit" onClick={register}>
            Register
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default LoginPage;
