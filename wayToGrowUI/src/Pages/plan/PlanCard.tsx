import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { IPlanWithID } from "../../App.interfaces";
import React, { useEffect, useState } from "react";
import usePlanContext from "../../providers/PlanContext";
import { useNavigate } from "react-router-dom";
import ModalForPlanModfication from "./ModalForPlanModification";

interface PlanCardProps {
  plan: IPlanWithID;
}

export default function PlanCard({ plan }: PlanCardProps): React.ReactElement {
  const { getPlanImage } = usePlanContext();
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

    fetchImage();
  }, [plan.id, getPlanImage]);

  const handleViewSteps = () => {
    navigate(`/steps/${plan.id}`); // Navigate to /steps/:planId
  };

  return (
    <MDBCol md="4">
      <ModalForPlanModfication
        planWithId={plan}
        isOpen={basicModal}
        toggleOpen={() => toggleOpen(modalTitle)}
        title={modalTitle}
        actionType="edit"
      />
      <MDBCard>
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
        >
          <MDBCardImage
            src={
              imageSrc ||
              "https://mdbootstrap.com/img/new/standard/nature/111.webp"
            } // Fallback image
            fluid
            alt={plan.title}
            className="img-fluid"
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
            <MDBRow className="w-100">
              <MDBCol>
                <MDBBtn onClick={handleViewSteps} rippleColor="light">
                  Zobacz
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBRow className="w-100 justify-content-center">
              <MDBCol md="auto">
                <MDBBtn onClick={handleViewSteps} rippleColor="light">
                  Usuń
                </MDBBtn>
              </MDBCol>
              <MDBCol md="auto">
                <MDBBtn
                  onClick={() => toggleOpen(`Modyfikuj plan: ${plan.title}`)}
                  color="secondary"
                  rippleColor="light"
                >
                  Modyfikuj
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
