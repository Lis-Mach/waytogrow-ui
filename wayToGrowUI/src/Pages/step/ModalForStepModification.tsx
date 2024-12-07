import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import  {IStepWithID }from "../../App.interfaces";
import React, { useEffect, useState, useRef } from "react";
import useStepContext from "../../providers/StepContext";

interface ModalComponentProps {
  planWithId: IStepWithID;
  isOpen: boolean;
  toggleOpen: () => void;
  title: string;
  actionType: "edit" | "create";
}

export default function ModalForStepModfication({
  stepWithId,
  isOpen,
  toggleOpen,
  title,
  actionType,
}: ModalComponentProps): React.ReactElement {
  const {editStep, addStep } = useStepContext();

  //State to manage the form with IStepWithID type
  const [form, setForm] = useState<IStepWithID>(() => stepWithId);

  const formRef = useRef<HTMLFormElement>(null);
  const emptyStepWithId = { title: "", subtitle: "", id: 0 , order: 0, status: false, };

  useEffect(() => {
    if (isOpen) {
      if (actionType === "edit" && stepWithId) {
        setForm(stepWithId); // Set form data when editing an existing plan
      } else {
        setForm(emptyStepWithId); // Default state for createPlan
      }
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(`in submit: ${form}`);
    if (!form) return;

    if (actionType === "edit") {
      // Edit existing plan
      await editStep(form.id, form);
      console.log("Updated step:", form);
    } else {
      // Create a new plan
      await addStep(form);
      console.log("Created new step:", form);
    }

    toggleOpen();
  }

  console.log(form);
  // Guard clause for loading state: return loading UI if data is not yet fetched
  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <MDBModal open={isOpen} onClose={toggleOpen} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{title}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleOpen}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <form id="planForm" onSubmit={handleSubmit} ref={formRef}>
              <MDBInput
                onChange={handleInputChange}
                wrapperClass="mb-4"
                label="Tytuł"
                id="title"
                type="text"
                name="title"
                value={form.title}
              />

              {/* { Surname input } */}
              <MDBInput
                onChange={handleInputChange}
                wrapperClass="mb-4"
                label="Opis"
                id="description"
                type="text"
                name="description"
                value={form.subtitle}
              />

            </form>
          </MDBModalBody>


          <MDBModalFooter>
            <MDBBtn color="secondary" block onClick={toggleOpen}>
              Close
            </MDBBtn>
            <MDBBtn type="submit" form="planForm" className="mb-4" block>
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
