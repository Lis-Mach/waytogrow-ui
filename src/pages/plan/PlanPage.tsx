import usePlanContext from "../../providers/PlanContext";
import { MDBContainer } from "mdb-react-ui-kit";
import PlanCardList from "./PlanCardList";
import React, { useState, useEffect } from "react";
import { IPlanWithID } from "../../App.interfaces";

function PlanPage(): React.ReactElement {
   const { plans } = usePlanContext();
  // const [uPlans, setUPlans] = useState<IPlanWithID[]>(plans);

  // const updatePlan = (updatedPlan: IPlanWithID) => {
  //   setUPlans((prevPlans) =>
  //     prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
  //   );
  // };

  // useEffect(() => {
  //   setUPlans(plans);
  // }, [plans]);

  return (
    <MDBContainer>
      <PlanCardList plans={plans} />
    </MDBContainer>
  );
}

export default PlanPage;
