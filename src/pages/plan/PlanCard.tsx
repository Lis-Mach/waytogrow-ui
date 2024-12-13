import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBCol,
} from "mdb-react-ui-kit";
import { IPlanWithID } from "../../App.interfaces";
import React, { useEffect, useState } from "react";
import usePlanContext from "../../providers/PlanContext";
import { useNavigate } from "react-router-dom";
import ModalForPlanModfication from "./ModalForPlanModification";

interface PlanCardProps {
  plan: IPlanWithID;
  updatePlan: (updatedPlan: IPlanWithID) => void;
}

export default function PlanCard({
  plan,
  updatePlan,
}: PlanCardProps): React.ReactElement {
  const { getPlanImage, deletePlan } = usePlanContext();
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");

  const toggleOpen = (title: string) => {
    setModalTitle(title);
    setBasicModal(!basicModal);
  };

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Fetch the image URL for this plan
    const fetchImage = async () => {
      const imageUrl = await getPlanImage(plan.id);
      setImageSrc(imageUrl);
    };
    setTimeout(() => { 
    fetchImage();
  }, 1000)
  }, [plan.id, getPlanImage]);

  const handleViewSteps = () => {
    navigate(`/steps/${plan.id}`); // Navigate to /steps/:planId
  };

  const handlePlanModification = (modifiedPlan: IPlanWithID) => {
    updatePlan(modifiedPlan);
  };

  const handleDelete = () => {
    deletePlan(plan.id);
  };

  return (
    <MDBCol md="4">
      <ModalForPlanModfication
        planWithId={plan}
        isOpen={basicModal}
        toggleOpen={() => toggleOpen(modalTitle)}
        title={modalTitle}
        actionType="edit"
        onPlanModified={handlePlanModification}
      />
      <MDBCard>
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
        >
          <MDBCardImage className="vw-100"
            src={
              imageSrc ||
              "https://mdbootstrap.com/img/new/standard/nature/111.webp"
            }
            fluid
            alt={plan.title}
            style={{ height: "250px", objectFit: "cover" }}
          />
          <a>
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </a>
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle>{plan.title}</MDBCardTitle>
          <MDBCardText>{plan.description}</MDBCardText>
          <>
            <div className="d-grid gap-2">
              <MDBBtn onClick={handleDelete} color="danger">
                Usuń
              </MDBBtn>

              <MDBBtn
                onClick={() => toggleOpen(`Modyfikuj plan: ${plan.title}`)}
                color="secondary"
                rippleColor="secondary"
              >
                Modyfikuj
              </MDBBtn>

              <MDBBtn onClick={handleViewSteps} rippleColor="light">
                Zobacz
              </MDBBtn>
            </div>
          </>
        </MDBCardBody>
      </MDBCard>
      <br />
    </MDBCol>
  );
}
