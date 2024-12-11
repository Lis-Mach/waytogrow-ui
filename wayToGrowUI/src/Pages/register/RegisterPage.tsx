import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBTextArea } from "mdb-react-ui-kit"; // Import MDB components
import { useNavigate } from "react-router-dom";

import { IUser } from "../../App.interfaces";
import useSignupContext from "../../providers/SignupContext";


function RegisterPage(): React.ReactElement {
  const { signup } = useSignupContext();
  const navigate = useNavigate();

  // State to manage form fields and error messages
  const [formData, setFormData] = useState<IUser>({
    login: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, surname, email, password } = formData;
    if (!name || !surname || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Mock API call simulation (this could be replaced with actual API logic)
    const success = await signup(formData);
    console.log("Registering user:", formData);

    if (success) {
      setError(null); // Clear error if validation passes
      navigate("/"); // Redirect to plans
    }
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h2 className="text-center">Zarejestruj się</h2>

      {/* Error message */}
      {error && (
        <MDBTextArea
          value={error}
          readOnly
          style={{ borderColor: "red", color: "red" }}
        />
      )}

      <form onSubmit={handleSubmit}>
        {/* Login input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Login"
          id="formName"
          type="text"
          name="login"
          value={formData.login}
          required
        />

        {/* Name input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Imię"
          id="formName"
          type="text"
          name="name"
          value={formData.name}
          required
        />

        {/* Surname input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Nazwisko"
          id="formSurname"
          type="text"
          name="surname"
          value={formData.surname}
          required
        />

        {/* Email input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Email"
          id="formEmail"
          type="email"
          name="email"
          value={formData.email}
          required
        />

        {/* Password input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Hasło"
          id="formPassword"
          type="password"
          name="password"
          value={formData.password}
          required
        />

        {/* Submit Button */}
        <MDBBtn type="submit" className="mb-4" block>
          Zarejestruj
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default RegisterPage;
