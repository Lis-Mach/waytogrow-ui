import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import useLoginContext from "../../Provider/LoginContext";
import { ILogin } from "../../App.interfaces";

function LoginPage(): React.ReactElement {
  const { logInFunction } = useLoginContext();

  const navigate = useNavigate();

  const [login, setLogin] = useState<ILogin>({ login: "", password: "" });

  const [error, setError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const errorElement = (
    <div className="text-center red">Wrong user or password!</div>
  );

  function handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    const success = await logInFunction(login);
    formRef.current?.reset();
    formRef.current?.login.focus();
    if (success) {
      navigate("/plans", { replace: true });
    } else {
      setError(true);
    }
  }

  return (
    <form onSubmit={handleLogin} ref={formRef}>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput
          onChange={handlechange}
          wrapperClass="mb-4"
          label="Login"
          id="form1"
          type="text"
          name="login"
          required
        />
        <MDBInput
          onChange={handlechange}
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
          name="password"
          required
        />
        {error && errorElement}

        <div className="d-flex justify-content-between mx-3 mb-4">
          {/* <a href="!#">Forgot password?</a> */}
        </div>
        <MDBBtn className="mb-4" type="submit">
          Sign in
        </MDBBtn>
        <div className="text-center">
          <p>
            Not a member? <a href="/register">Register</a>
          </p>
        </div>
      </MDBContainer>
    </form>
  );
}

export default LoginPage;
