import { useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/authProvider";
import useUserContext from "../Provider/UserContext";


import React, { useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';

export default function PlanPage (): React.ReactElement {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const { getUser } = useUserContext();

  async function handleLogout() {
    setToken(null); 
    navigate("/", { replace: true });
  };

  useEffect(() => {
        getUser();      
  }, []) 

  return (
    
    <MDBCard>
         <MDBBtn 
         onClick={handleLogout} className="ms-auto">Wyloguj</MDBBtn>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
        <MDBBtn href='#'>Button</MDBBtn>
      </MDBCardBody>
    </MDBCard>
    
  );
}

