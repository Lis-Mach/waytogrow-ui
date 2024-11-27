import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import LoginProvider from "../Provider/LoginContext";

//WERSJA NIZEMNIENIONA
const Login: React.FC = () => {
  const { login } = LoginProvider();
  const navigate = useNavigate();

  const [login1, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login({ login: login1, password });
    navigate("/", { replace: true });
  }

  return (
    <form onSubmit={handleLogin}>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          wrapperClass="mb-4"
          label="Login"
          id="form1"
          type="text"
        />
        <MDBInput
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
        />

        <div className="d-flex justify-content-between mx-3 mb-4">
          {/* <a href="!#">Forgot password?</a> */}
        </div>

        <MDBBtn className="mb-4" type="submit">
          Sign in
        </MDBBtn>

        <div className="text-center">
          <p>
            Not a member? <a href="#!">Register</a>
          </p>
        </div>
      </MDBContainer>
    </form>
  );
};

export default Login;
