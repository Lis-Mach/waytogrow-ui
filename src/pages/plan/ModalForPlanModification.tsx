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
  const { editPlan, addPlan, setPlanImage } = usePlanContext();

  //State to manage the form with IUserWithID type
  const [form, setForm] = useState<IPlanWithID>(() => planWithId);

  const formRef = useRef<HTMLFormElement>(null);
  const emptyPlanWithId = { title: "", description: "", image: "", id: 0 };

  const [file, setFile] = useState<string | undefined>();

  useEffect(() => {
    if (isOpen) {
      if (actionType === "edit" && planWithId) {
        setForm(planWithId); // Set form data when editing an existing plan
        setFile(undefined)
      } else {
        setForm(emptyPlanWithId); // Default state for createPlan
        setFile(undefined)
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
      await editPlan(form.id, form);
      console.log("Updated plan:", form);
    } else {
      // Create a new plan
      form.id = await addPlan(form);
      console.log("Created new plan:", form);
    }


    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const selectedFile = fileInput?.files?.[0]; // Get the file from input

    if (selectedFile) {
      formData.append('file', selectedFile);
      await setPlanImage(form.id, formData)
    }
      
    toggleOpen();

   
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
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
               {/* { image input } */}
               <MDBInput
                onChange={handleImageChange}
                wrapperClass="mb-4"
                id="image"
                type="file"
                name="image"
                accept="image/*"
              />
              {file && <img className="img-fluid vw-100"
            style={{ height: "250px", objectFit: "cover" }} src={file} alt="Uploaded" />}
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
