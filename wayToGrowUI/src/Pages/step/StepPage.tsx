import useStepContext from "../../providers/StepContext";
import ModalForStepModfication from "./ModalForStepModification";
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
      getSteps(Number(planId)); 
    }
  }, []);

  useEffect(() => {
    setUSteps(steps);
  }, [steps]);

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
    <MDBContainer>
     
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
        planId={Number(planId)}
      />
      <h1></h1>
      <StepCardList steps={uSteps} updateStep={updateStep} />
    </MDBContainer>
  );
}

export default StepPage;
