import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import FormElement from "../FormElement";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [warning, setWarning] = useState(null);
  const [code, setCode] = useState("");
  const history = useHistory();
  
  const signUp = (e) => {
    e.preventDefault();

    if (!validateStep1()) {
      return;
    }

    Auth.signUp({ username: email, password, attributes: { email, name: firstName, family_name: lastName } })
      .then((data) => {
        console.log('signUp:', data);
        setWaitingForCode(true);
        setPassword("");
        setWarning(null);
      })
      .catch((err) => {
        setWarning(err.message);
        console.log(err);
      });
  };

  const validateStep1 = () => {
    if (email.length <= 0) {
      setWarning("Email is mandatory");
      return false;
    }
    if (password.length <= 0) {
      setWarning("Password is mandatory");
      return false;
    }
    if (password !== passwordConfirmed) {
      setWarning("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (code.length <= 0) {
      setWarning("Code is mandatory");
      return false;
    }
    return true;
  };

  const confirmSignUp = (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    Auth.confirmSignUp(email, code)
      .then((data) => {
        console.log('confirmSignUp:', data);
        setWaitingForCode(false);
        setEmail("");
        setCode("");
        setWarning(null);
        history.push("")
      })
      .catch((err) => {
        setWarning(err.message);
        console.log(err);
      })
    ;
  };
  
  const resendCode = () => {
    Auth.resendSignUp(email)
      .then(() => {
        setWarning(null);
        console.log("code resent successfully");
      })
      .catch((err) => {
        setWarning(err.message);
        console.log(err);
      });
  };
  
  return (
    <div className="form">
      <h3>Sign Up</h3>
      {!waitingForCode && (
        <form>
          <FormElement label="First Name" forId="sign-up-first-name">
            <input
              id="sign-up-first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              autoComplete="first-name"
            />
          </FormElement>
          <FormElement label="Last Name" forId="sign-up-last-name">
            <input
              id="sign-up-last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              autoComplete="last-name"
            />
          </FormElement>
          <FormElement label="Email" forId="sign-up-email">
            <input
              id="sign-up-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
            />
          </FormElement>
          <FormElement label="Password" forId="sign-up-password">
            <input
              id="sign-up-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="new-password"
            />
          </FormElement>
          <FormElement label="Confirm password" forId="sign-up-password-confirmation">
            <input
              id="sign-up-password-confirmation"
              type="password"
              value={passwordConfirmed}
              onChange={(e) => setPasswordConfirmed(e.target.value)}
              placeholder="Confirm Password"
              autoComplete="new-password"
            />
          </FormElement>
          <button type="submit" onClick={signUp}>
            Sign Up
          </button>
        </form>
      )}
      {waitingForCode && (
        <form>
          <FormElement label="Confirmation Code" forId="sign-up-code">
            <input
              id="sign-up-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="code"
            />
          </FormElement>
          <button type="submit" onClick={confirmSignUp}>
            Confirm Sign Up
          </button>
          <button type="button" onClick={resendCode}>
            Resend code
          </button>
        </form>
      )}
      <div>{warning}</div>
    </div>
  );
};

export default SignUp;
