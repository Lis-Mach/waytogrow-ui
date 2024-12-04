import { useNavigate } from "react-router-dom";

import React from "react";

import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";  

const HomePage: React.FC = () => {
  const navigate = useNavigate();  

  const handleLoginClick = () => {
    navigate("/login");  // Navigate to the Login page
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <MDBRow className="text-center">
        <MDBCol>
        <h1>Way to Grow</h1>
        <> </>
          <h3>Welcome to your plans</h3>
          <p className="lead">Zaloguj się lub zarejestruj aby rozpocząć:</p>
          
          <div className="d-flex justify-content-center gap-3">
            {/* Login Button */}
            <MDBBtn size="lg" onClick={handleLoginClick}>
              Login
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default HomePage;
