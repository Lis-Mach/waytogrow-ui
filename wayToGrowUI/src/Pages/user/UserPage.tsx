import useUserContext from "../../providers/UserContext";
import React, { useEffect, useState, useRef } from "react";
import { MDBBtn, MDBContainer, MDBInput } from "mdb-react-ui-kit";
import { IUserWithID } from "../../App.interfaces";

export default function UserPage(): React.ReactElement {
  // const navigate = useNavigate();
  const { updateUser, user } = useUserContext();

  // State to manage the form with IUserWithID type
  const [form, setForm] = useState<IUserWithID>(() => user);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form) return; // Guard to ensure the state is not null

    try {
      const success = await updateUser(form);
      console.log("Updated user:", form);

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
    if (user) {
      setForm(user);
    }
  }, [user]);

  console.log(form);
  // Guard clause for loading state: return loading UI if data is not yet fetched
  if (!form) {
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
        <MDBInput
          disabled
          wrapperClass="mb-4"
          label="Login"
          id="formName"
          type="text"
          name="login"
          value={form.login}
        />

        <MDBInput
          disabled
          wrapperClass="mb-4"
          label="Password"
          id="formName"
          type="text"
          name="password"
          value="***************"
        />

        {/* Name input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Name"
          id="formName"
          type="text"
          name="name"
          value={form.name}
        />

        {/* Surname input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Surname"
          id="formSurname"
          type="text"
          name="surname"
          value={form.surname}
        />

        {/* Email input */}
        <MDBInput
          onChange={handleInputChange}
          wrapperClass="mb-4"
          label="Email"
          id="formEmail"
          type="email"
          name="email"
          value={form.email}
        />

        {/* Submit Button */}
        <MDBBtn type="submit" className="mb-4" block>
          Modyfikuj
        </MDBBtn>
      </form>
    </MDBContainer>
  );
}
