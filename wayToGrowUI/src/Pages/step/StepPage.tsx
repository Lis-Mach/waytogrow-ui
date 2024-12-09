import useStepContext from "../../providers/StepContext";

import React, { useEffect, useState } from "react";
import { MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import StepCardList from "./StepCardList";
import { useParams } from "react-router-dom";
import { IStepWithID } from "../../App.interfaces";

function StepPage(): React.ReactElement {
  const { planId } = useParams(); // Retrieve the planId from the URL parameters
  const { steps, getSteps } = useStepContext();
  const [uSteps, setUSteps] = useState<IStepWithID[]>(steps);

  console.log(`PLANID:  ${planId}`);


  const updateStep = (updatedStep: IStepWithID) => {
    setUSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === updatedStep.id ? updatedStep : step))
    );
  };

  useEffect(() => {
    if (planId) {
      getSteps(Number(planId)); // Fetch the steps for the given planId
    }
  }, []);

  useEffect(() => {
    setUSteps(steps);
  }, [steps]);

  
  
  return (
    <MDBContainer>
      {/* <MDBBtn onClick={() => toggleOpen("Utwórz nowy")} rippleColor="light"> */}
        {/* Utwórz NOWY */}
      {/* </MDBBtn> */}
      <h1></h1>
      <StepCardList steps={uSteps} updateStep={updateStep} />
    </MDBContainer>
  );
}

export default StepPage;
