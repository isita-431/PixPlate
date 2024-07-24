import React from "react";
import { PixContainer, PixHeading, CenterContainer } from "./pix.styles";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PixSpan } from './pix.styles';

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
    <CenterContainer>
    <PixContainer style={{ width: '30%'}}>
          <PixHeading>Signup</PixHeading>
          <Form>
            <Form.Group size="lg" className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label >Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <br/>
            <Form.Group size="lg" className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label >Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <br/>
            <Form.Group size="lg" className="mb-3" controlId="exampleForm.ControlPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your passwprd" />
            </Form.Group>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Button variant="primary" style={{marginTop: '1rem'}}>Sign Up</Button>
            </div>
          </Form>
          <PixSpan>
            Already have an account? <a href="/login">Login here</a>
          </PixSpan>
        </PixContainer>
    </CenterContainer>
  );
};

export default PixSignup;
