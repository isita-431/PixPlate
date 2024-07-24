import React from "react";
import { GoogleLogin } from "react-google-login";
import {
  PixContainer,
  PixHeading,
  PixButton,
  PixSpan,
  CenterContainer,
} from "./pix.styles";

const CLIENT_ID =
  "419066637632-1idsgfddcdfn0enpoh62p8g9tvdsqjqc.apps.googleusercontent.com";

const PixLogin = () => {
  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response.profileObj);
  };

  const handleLoginFailure = (response) => {
    console.log("Login Failed:", response);
  };

  return (
    <>
      <div style={{ height: "1rem", marginTop: "4rem" }}></div>
      <CenterContainer>
        <PixContainer
          style={{
            marginTop: "6rem",
          }}
        >
          <PixHeading>Login</PixHeading>
          <form>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <PixButton type="submit">Login</PixButton>
          </form>
          <PixSpan>or</PixSpan>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
          <PixSpan>
            Don't have an account? <a href="/signup">Sign up here</a>
          </PixSpan>
        </PixContainer>
      </CenterContainer>
    </>
  );
};

export default PixLogin;
