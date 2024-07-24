import React from "react";
import Form from 'react-bootstrap/Form';

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
        <PixContainer style={{ width: '30%'}}>
          <PixHeading>Login</PixHeading>
          <Form>
            <Form.Group size="lg" className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label >Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <br/>
            <Form.Group size="lg" className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your passwprd" />
            </Form.Group>
          </Form>
          <PixSpan>or</PixSpan>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '1.5rem'}}>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <PixSpan>
            Don't have an account? <a href="/signup">Sign up here</a>
          </PixSpan>
        </PixContainer>
      </CenterContainer>
    </>
  );
};

export default PixLogin;
