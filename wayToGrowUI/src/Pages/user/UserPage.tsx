import { useNavigate } from "react-router-dom";
import useUserContext from "../../Provider/UserContext";

import React, { useEffect, useState, useRef } from "react";
import { MDBBtn, MDBContainer, MDBInput } from "mdb-react-ui-kit";
import { UpdateUserPayload } from "../../App.interfaces";

export default function UserPage(): React.ReactElement {
  const navigate = useNavigate();
  const { updateUser, getUser } = useUserContext();

  // State to manage form fields and error messages
  const [UpdateUserPayload, setUpdateUserPayload] = useState<UpdateUserPayload>(
    {
      name: "",
      surname: "",
      email: "",
      password: "",
    }
  );

  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateUserPayload((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

  const success = await updateUser(UpdateUserPayload);
  console.log("Updated user:", UpdateUserPayload);

  if (success) {
    setError(null); // Clear error if validation passes
    // navigate("/"); // Redirect to plans
  } else {
    alert(error)
  }
  }
 
  useEffect(() => {
    async function fetchUserData() {
      const user = await getUser();
      if (user) {
        setUpdateUserPayload({
          name: user.name || "",
          surname: user.surname || "",
          email: user.email || "",
          password: "", 
        });
      }
    }

    fetchUserData();
  }, [getUser]);

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <h2 className="text-center">Modyfikuj dane profilu</h2>

      {/* Error message
      {error && (
        <MDBTextArea
          value={error}
          readOnly
          style={{ borderColor: "red", color: "red" }}
        />
      )} */}

      <form onSubmit={handleSubmit} ref={formRef}>
        {/* Name input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Name"
          id="formName"
          type="text"
          name="name"
          value={UpdateUserPayload.name}
        />

        {/* Surname input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Surname"
          id="formSurname"
          type="text"
          name="surname"
          value={UpdateUserPayload.surname}
        
        />

        {/* Email input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Email"
          id="formEmail"
          type="email"
          name="email"
          value={UpdateUserPayload.email}
          
        />

        {/* Password input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Password"
          id="formPassword"
          type="password"
          name="password"
          value={UpdateUserPayload.password}
          
        />

        {/* Submit Button */}
        <MDBBtn type="submit" className="mb-4" block>
          Modyfikuj
        </MDBBtn>
      </form>
    </MDBContainer>
  );
}
