import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { handleEmailChange, handlePasswordChange } from "../utilities/handleChanges";
import {
  PixContainer,
  PixHeading,
  PixSpan,
  CenterContainer,
} from "./pix.styles";
import { login } from '../services/auth.service'

const PixLogin = (props) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errors.email !== "" || errors.password !== "") {
      return;
    }

    const data = await login(email, password);
    if (!data.success) {
      return setErrors((prev) => ({
        ...prev,
        form: data.message,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      form: "",
    }));

    navigate("/pix-fridge");
  };

  return (
    <>
      <div style={{ height: "1rem", marginTop: "4rem" }}></div>
      <CenterContainer>
        <PixContainer style={{ width: '30%'}}>
          <PixHeading>Login</PixHeading>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" className="mb-3" controlId="email">
              <Form.Label >Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" onChange={(event) => handleEmailChange(event.target.value, setEmail, setErrors)}/>
              <div style={{color: 'red'}}>{errors.email}</div>
            </Form.Group>
            <br/>
            <Form.Group size="lg" className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your passwprd" 
              onChange={(event) => handlePasswordChange(event.target.value, setPassword, setErrors)}/>
              <div style={{color: 'red'}}>{errors.password}</div>
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '1.5rem'}}>
              <Button variant="primary"  type="submit">Login</Button>
            </div>
            <div style={{color: 'red', textAlign: 'center'}}>{errors.form}</div>
          </Form>
          <PixSpan>or</PixSpan>
          <PixSpan>
            Don't have an account? <a href="/signup">Sign up here</a>
          </PixSpan>
        </PixContainer>
      </CenterContainer>
    </>
  );
};

export default PixLogin;
