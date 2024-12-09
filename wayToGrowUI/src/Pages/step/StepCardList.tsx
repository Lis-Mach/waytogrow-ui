import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import StepCard from "./StepCard";
import { IStepWithID } from "../../App.interfaces";
import React, { useState } from "react";
import ModalForStepModfication from "./ModalForStepModification";


interface StepCardListProps {
  steps: IStepWithID[]; // Ensure 'steps' is an array of 'IstepWithID'
  updateStep: (updatedStep: IStepWithID) => void;
}

export default function StepCardList({
  steps,
  updateStep,
}: StepCardListProps): React.ReactElement {
  console.log(steps);

  const [basicModal, setBasicModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");

  const emptyStepWithId = {
    title: "",
    subtitle: "",
    status: false,
    id: 0,
    order: 0,
    plan_id: 0,
  };

  const toggleOpen = (title: string) => {
    setModalTitle(title);
    setBasicModal(!basicModal); // Toggle the modal visibility
  };

  const handleStepModification = (modifiedStep: IStepWithID) => {
    updateStep(modifiedStep);
  };
 

  return (
    <div>
      {/* //<MDBRow>{plan.title}</MDBRow> */}
      <MDBBtn onClick={() => toggleOpen("Utwórz nowy")} rippleColor="secondary">
        Utwórz NOWY
      </MDBBtn>
      <h1></h1>
      <ModalForStepModfication
        stepWithId={emptyStepWithId}
        isOpen={basicModal}
        toggleOpen={() => toggleOpen(modalTitle)}
        title={modalTitle}
        actionType="create"
        onStepModified={handleStepModification}
      />
      <MDBTable align="middle">
        <MDBTableHead className="table-dark">
          <tr>
            <th scope="col">Tytuł</th>
            <th scope="col">Opis</th>
            <th scope="col">Status</th>
            <th scope="col">Akcja</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
         
          {steps.map((step) => (
            <StepCard
           
            key={step.order}
            step={step}
            updateStep={updateStep}>
           
            </StepCard>
          ))}
         
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
