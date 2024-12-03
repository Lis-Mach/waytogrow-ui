import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/authProvider";

import useStepContext from "../../Provider/StepContext";


import React, { useEffect } from "react";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import StepCardList from "./StepCardList";
import { useParams } from "react-router-dom";

function StepPage(): React.ReactElement {
  const { planId } = useParams(); // Retrieve the planId from the URL parameters
  const { steps, getSteps } = useStepContext();

  console.log(`PLABID: DUPA SYLWIA: ${planId}`);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setToken(null);
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if (planId) {
      getSteps(Number(planId)); // Fetch the steps for the given planId
    }
  }, []); 

  return (
    <MDBContainer>
      <MDBBtn onClick={handleLogout} className="ms-auto">
        Wyloguj
      </MDBBtn>
      <StepCardList steps={steps} />
    </MDBContainer>
  );
}

export default StepPage;
