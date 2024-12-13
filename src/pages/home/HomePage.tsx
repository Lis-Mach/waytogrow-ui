import { useNavigate } from "react-router-dom";

import React from "react";

import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import HomePageImage from "./HomePageImage.png";



export default function HomePage(): React.ReactElement {
  const navigate = useNavigate();

  const myStyle = {
    backgroundImage: `url(${HomePageImage})`,
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the Login page
  };

  return (
    <div style={myStyle}>
      <MDBContainer
        className="d-flex  justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <MDBRow>
          <MDBCol className="text-center bg-light ">
            <h1>Way to Grow</h1>

            <h4>Welcome to your plans</h4>
            <p className="lead ">Zaloguj się lub zarejestruj aby rozpocząć:</p>

            <div className="d-flex justify-content-center gap-3">
              {/* Login Button */}
              <MDBBtn size="lg" onClick={handleLoginClick}>
                Zaloguj się
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
