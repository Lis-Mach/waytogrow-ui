import { MDBRow, MDBBtn } from "mdb-react-ui-kit";
import PlanCard from "./PlanCard";
import { IPlanWithID } from "../../App.interfaces";
import ModalForPlanModfication from "./ModalForPlanModification";
import React, { useState } from "react";

interface PlanCardListProps {
  plans: IPlanWithID[];
  updatePlan: (updatedPlan: IPlanWithID) => void;
}

export default function PlanCardList({
  plans,
  updatePlan,
}: PlanCardListProps): React.ReactElement {
  console.log(plans);
  const [basicModal, setBasicModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const emptyPlanWithId = { title: "", description: "", image: "", id: 0 };

  const toggleOpen = (title: string) => {
    setModalTitle(title);
    setBasicModal(!basicModal); // Toggle the modal visibility
  };

  const handlePlanModification = (modifiedPlan: IPlanWithID) => {
    setTimeout(() => { 
      updatePlan(modifiedPlan);
    }, 1000)
    
  };

 

  return (
    <div>
      <MDBBtn onClick={() => toggleOpen("Utwórz nowy")} rippleColor="light">
        Utwórz NOWY
      </MDBBtn>
      <h1></h1>
      <ModalForPlanModfication
        planWithId={emptyPlanWithId}
        isOpen={basicModal}
        toggleOpen={() => toggleOpen(modalTitle)}
        title={modalTitle}
        actionType="create"
        onPlanModified={handlePlanModification}
      />
      <MDBRow>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            updatePlan={updatePlan}
          ></PlanCard>
        ))}
      </MDBRow>
    </div>
  );
}
