import useStepContext from "../../providers/StepContext";

import React, { useEffect } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import StepCardList from "./StepCardList";
import { useParams } from "react-router-dom";

function StepPage(): React.ReactElement {
  const { planId } = useParams(); // Retrieve the planId from the URL parameters
  const { steps, getSteps } = useStepContext();

  console.log(`PLANID:  ${planId}`);

  useEffect(() => {
    if (planId) {
      getSteps(Number(planId)); // Fetch the steps for the given planId
    }
  }, []);

  return (
    <MDBContainer>
      <h6> If step is finished, klick checkbox ...</h6>
      <StepCardList steps={steps} />
    </MDBContainer>
  );
}

export default StepPage;
