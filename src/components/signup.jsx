import React from "react";
import { GoogleLogin } from "react-google-login";
import { PixContainer, PixHeading, PixButton, PixSpan } from "./pix.styles";

const CLIENT_ID =
  "419066637632-1idsgfddcdfn0enpoh62p8g9tvdsqjqc.apps.googleusercontent.com";

const PixSignup = () => {
  const handleSignupSuccess = (response) => {
    console.log("Signup Success:", response.profileObj);
  };

  const handleSignupFailure = (response) => {
    console.log("Signup Failed:", response);
  };

  return (
    <PixContainer style={{ marginTop: "9rem" }}>
      <PixHeading>Signup</PixHeading>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <PixButton type="submit">Signup</PixButton>
      </form>
      <PixSpan>or</PixSpan>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Signup with Google"
        onSuccess={handleSignupSuccess}
        onFailure={handleSignupFailure}
        cookiePolicy={"single_host_origin"}
      />
      <PixSpan>
        Already have an account? <a href="/login">Login here</a>
      </PixSpan>
    </PixContainer>
  );
};

export default PixSignup;
