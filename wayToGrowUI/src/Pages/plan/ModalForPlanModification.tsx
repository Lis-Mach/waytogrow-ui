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
import { IPlanWithID } from "../../App.interfaces";
import React, { useEffect, useState, useRef } from "react";
import usePlanContext from "../../providers/PlanContext";

interface ModalComponentProps {
  planWithId: IPlanWithID;
  isOpen: boolean;
  toggleOpen: () => void;
  title: string;
  actionType: "edit" | "create";
}

export default function ModalForPlanModfication({
  planWithId,
  isOpen,
  toggleOpen,
  title,
  actionType,
}: ModalComponentProps): React.ReactElement {
  const { editPlan, addPlan } = usePlanContext();

  //State to manage the form with IUserWithID type
  const [form, setForm] = useState<IPlanWithID>(() => planWithId);

  const formRef = useRef<HTMLFormElement>(null);
  const emptyPlanWithId = { title: "", description: "", image: "", id: 0 };

  useEffect(() => {
    if (isOpen) {
      if (actionType === "edit" && planWithId) {
        setForm(planWithId); // Set form data when editing an existing plan
      } else {
        setForm(emptyPlanWithId); // Default state for createPlan
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
    console.log(`in submit: ${form}`)
    if (!form) return; 

    if (actionType === "edit") {
      // Edit existing plan
      await editPlan(form.id, form);
      console.log("Updated plan:", form);
    } else {
      // Create a new plan
      await addPlan(form);
      console.log("Created new plan:", form);
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
                value={form.description}
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
