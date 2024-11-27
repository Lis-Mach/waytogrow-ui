import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import useLoginContext from "../Provider/LoginContext";

function LoginPage(): React.ReactElement {
  //const Login bylo
  const { logInFunction } = useLoginContext();

  const navigate = useNavigate();

  const [login, setLogin] = useState<ILogin>({ login: "", password: "" });

  function handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await logInFunction(login);
    navigate("/", { replace: true });
  }

  return (
    <form onSubmit={handleLogin}>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput
          onChange={handlechange}
          wrapperClass="mb-4"
          label="Login"
          id="form1"
          type="text"
          name="login"
        />
        <MDBInput
          onChange={handlechange}
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
          name="password"
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
}
//https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
export default LoginPage;
