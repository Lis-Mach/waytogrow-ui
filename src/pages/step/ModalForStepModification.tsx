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
  MDBSwitch,
} from "mdb-react-ui-kit";
import { IStepWithID } from "../../App.interfaces";
import React, { useEffect, useState, useRef } from "react";
import useStepContext from "../../providers/StepContext";

interface ModalComponentProps {
  stepWithId: IStepWithID;
  isOpen: boolean;
  toggleOpen: () => void;
  title: string;
  actionType: "edit" | "create";
  onStepModified: (modifiedStep: IStepWithID) => void;
  planId: number;
}

export default function ModalForStepModfication({
  stepWithId,
  isOpen,
  toggleOpen,
  title,
  actionType,
  onStepModified,
  planId,
}: ModalComponentProps): React.ReactElement {
  const { editStep, addStep } = useStepContext();

  //State to manage the form with IStepWithID type
  const [form, setForm] = useState<IStepWithID>(() => stepWithId);

  const formRef = useRef<HTMLFormElement>(null);
  const emptyStepWithId = {
    title: "",
    subtitle: "",
    id: 0,
    order: 0,
    status: false,
    plan_id: 0,
  };

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
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setForm((prevData) => ({
        ...prevData!,
        [name]: checked, // Set the status to true/false based on checked
      }));
    } else {
      setForm((prevData) => ({
        ...prevData!,
        [name]: value, // For regular inputs
      }));
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(`in submit: ${form}`);
    if (!form) return;

    if (actionType === "edit") {
      // Edit existing plan
      await editStep(planId, form.id, form);
      console.log("Updated step:", form);
    } else {
      // Create a new plan
      form.id = await addStep(planId, form);
      console.log("Created new step:", form);
    }

    toggleOpen();
    onStepModified(form);
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
            <MDBBtn className="btn-close" color="none" onClick={toggleOpen} />
          </MDBModalHeader>
          <MDBModalBody>
            <form id="stepForm" onSubmit={handleSubmit} ref={formRef}>
              <MDBInput
                onChange={handleInputChange}
                wrapperClass="mb-4"
                label="Tytuł"
                id="title"
                type="text"
                name="title"
                value={form.title}
              />
              <MDBInput
                onChange={handleInputChange}
                wrapperClass="mb-4"
                label="Opis"
                id="subtitle"
                type="text"
                name="subtitle"
                value={form.subtitle}
              />

              <section className="d-flex justify-content-center mb-4">
                <MDBSwitch
                  id="status"
                  label="Gotowe"
                  name="status"
                  checked={form.status}
                  onChange={handleInputChange}
                />
              </section>
            </form>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color="secondary" block onClick={toggleOpen}>
              Close
            </MDBBtn>
            <MDBBtn type="submit" form="stepForm" className="mb-4" block>
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
