import { MDBRow, MDBBtn } from "mdb-react-ui-kit";
import PlanCard from "./PlanCard";
import { IPlanWithID } from "../../App.interfaces";
import ModalForPlanModfication from "./ModalForPlanModification";
import React, { useState } from "react";

interface PlanCardListProps {
  plans: IPlanWithID[]; // Ensure 'plans' is an array of 'IPlanWithID'
}

export default function PlanCardList({
  plans,
}: PlanCardListProps): React.ReactElement {
  console.log(plans);
  const [basicModal, setBasicModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const emptyPlanWithId = { title: "", description: "", image: "", id: 0 };

  const toggleOpen = (title: string) => {
    setModalTitle(title);
    setBasicModal(!basicModal); // Toggle the modal visibility
  };

  return (
    <div>
      <MDBBtn onClick={() => toggleOpen('Utwórz nowy')} rippleColor="light">Utwórz NOWY</MDBBtn>
      <h1></h1>
      <ModalForPlanModfication
        planWithId={emptyPlanWithId}
        isOpen={basicModal}
        toggleOpen={() => toggleOpen(modalTitle)}
        title={modalTitle}
        actionType="create"
      />
      <MDBRow>
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan}></PlanCard>
        ))}
      </MDBRow>
    </div>
  );
}
