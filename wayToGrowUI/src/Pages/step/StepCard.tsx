import {  MDBBtn,MDBIcon } from "mdb-react-ui-kit";
import { IStepWithID } from "../../App.interfaces";

import { useState,  } from "react";
import useStepContext from "../../providers/StepContext";

import ModalForStepModfication from "./ModalForStepModification";

interface StepCardProps {
  step: IStepWithID;
   updateStep: (updatedStep: IStepWithID) => void;
}

export default function StepCard({
   step,
 updateStep,
   }: StepCardProps): React.ReactElement {

    const {deleteStep } = useStepContext();
   
    const [basicModal, setBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>("");
  

    const toggleOpen = (title: string) => {
      setModalTitle(title);
      setBasicModal(!basicModal);
    };

  
    const handleStepModification = (modifiedStep: IStepWithID) => {
      updateStep(modifiedStep);
    };
  
    const handleDelete = () => {
      deleteStep(step.id );
    };


  return (
    <>
     <ModalForStepModfication
        stepWithId={step}
        isOpen={basicModal}
        toggleOpen={() => toggleOpen(modalTitle)}
        title={modalTitle}
        actionType="edit"
        onStepModified={handleStepModification}
      />
     <tr>
     <td> {step.title}</td>
              <td> {step.subtitle}</td>
              <td> {step.status}
                <MDBIcon far icon="check-square" size='2x' iconType='solid'/></td>
              <td>
                <MDBBtn onClick={handleDelete} block color="danger"  rippleColor="secondary">Usuń</MDBBtn>
                <h2></h2>
                <MDBBtn
                 onClick={() => toggleOpen(`Modyfikuj step: ${step.title}`)}
                block rippleColor="secondary"color="secondary" >Modyfikuj</MDBBtn>
              </td> 
              </tr>
              </>
  );
}

