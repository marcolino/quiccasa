import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import FormElement from "../FormElement";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [code, setCode] = useState("");
  const history = useHistory();

  const forgotPassword = (e) => {
    e.preventDefault();
    Auth.forgotPassword(email)
      .then((data) => {
        console.log(data);
        setWaitingForCode(true);
        setPassword("");
        switch (data.CodeDeliveryDetails.DeliveryMedium) {
          default: // TODO: ... treat EMAIL/SMS/... separately ?
            alert(`Verification code sent via ${data.CodeDeliveryDetails.AttributeName} to ${data.CodeDeliveryDetails.Destination}.\nPlease open it and copy and paste it here.`); // TODO: ...
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };
  
  const confirmForgotPassword = (e) => {
    e.preventDefault();
    
    Auth.forgotPasswordSubmit(email, code, password)
      .then((data) => {
        console.log(data);
        setWaitingForCode(false);
        setEmail("");
        setCode("");
        if (data) alert("Password reset successfully") ; // TODO...
        history.push("/signin");
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      })
    ;
  };
  
  const resendCode = () => {
    Auth.resendResetPassword(email)
      .then(() => {
        console.log("code resent successfully");
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };
  
  return (
    <div className="form">
      <h3>Reset Password</h3>
      {!waitingForCode && (
        <form>
          <FormElement label="Your email" forId="sign-up-email">
            <input
              id="sign-up-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </FormElement>
          <button type="submit" onClick={forgotPassword}>
            Reset password
          </button>
        </form>
      )}
      {waitingForCode && (
        <form>
          <FormElement label="New password" forId="new-password">
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </FormElement>
          <FormElement label="Confirmation code" forId="sign-up-code">
            <input
              id="sign-up-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="code"
            />
          </FormElement>
          <button type="submit" onClick={confirmForgotPassword}>
            Confirm to reset password
          </button>
          <button type="button" onClick={resendCode}>
            Resend code
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
