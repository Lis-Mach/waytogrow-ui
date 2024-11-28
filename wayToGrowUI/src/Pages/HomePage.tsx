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
          <h1>Welcome to your plans</h1>
          <p className="lead">Login or register to start:</p>
          
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
