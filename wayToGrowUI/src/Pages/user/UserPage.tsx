import { useNavigate } from "react-router-dom";
import useUserContext from "../../Provider/UserContext";
import React, { useEffect, useState, useRef } from "react";
import { MDBBtn, MDBContainer, MDBInput } from "mdb-react-ui-kit";
import { IUserWithID } from "../../App.interfaces";

export default function UserPage(): React.ReactElement {
  const navigate = useNavigate();
  const { updateUser, getUser } = useUserContext();

  // State to manage the form with IUserWithID type
  const [updateUserPayload, setUpdateUserPayload] = useState<IUserWithID | null>(getUser);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateUserPayload((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!updateUserPayload) return; // Guard to ensure the state is not null


    try {
      const success = await updateUser(updateUserPayload);
      console.log("Updated user:", updateUserPayload);

      if (success) {
        setError(null); 
      } else {
        setError("Failed to update user.");
      }
    } catch (error) {
      setError("An error occurred while updating user.");
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getUser(); // Assume this returns an IUserWithID object
        if (user) {
          setUpdateUserPayload(user); // Populate state with fetched user data
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [getUser]); // Only fetch user data once the component mounts

  // Guard clause for loading state: return loading UI if data is not yet fetched
  if (!updateUserPayload) {
    return <div>Loading...</div>;
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h2 className="text-center">Modyfikuj dane profilu</h2>

      {/* Error message */}
      {error && (
        <div style={{ borderColor: "red", color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} ref={formRef}>
        {/* Name input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Name"
          id="formName"
          type="text"
          name="name"
          value={updateUserPayload.name}
        />

        {/* Surname input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Surname"
          id="formSurname"
          type="text"
          name="surname"
          value={updateUserPayload.surname}
        />

        {/* Email input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Email"
          id="formEmail"
          type="email"
          name="email"
          value={updateUserPayload.email}
        />

        {/* Password input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Password"
          id="formPassword"
          type="password"
          name="password"
          value={updateUserPayload.password}
        />

        {/* Submit Button */}
        <MDBBtn type="submit" className="mb-4" block>
          Modyfikuj
        </MDBBtn>
      </form>
    </MDBContainer>
  );
}
