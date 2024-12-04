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
import usePlanContext from "../../Provider/PlanContext";
import { useNavigate } from "react-router-dom"; 

interface PlanCardProps {
    plan: IPlanWithID;  
}

export default function PlanCard({plan }: PlanCardProps): React.ReactElement {
    const {getPlanImage} = usePlanContext();
    const navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)
    
    useEffect(() => {
        // Fetch the image URL for this plan
        const fetchImage = async () => {
          const imageUrl = await getPlanImage(plan.id);
          setImageSrc(imageUrl);
        };
    
        fetchImage();
      }, [plan.id, getPlanImage]);

      const handleViewSteps = () => {
        navigate(`/steps/${plan.id}`);  // Navigate to /steps/:planId
      };

      
      


return (
<MDBCol  md='4' >
    <MDBCard>
        
        <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
        >
            <MDBCardImage
            src={imageSrc || "https://mdbootstrap.com/img/new/standard/nature/111.webp"} // Fallback image
            fluid
            alt={plan.title}
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
            <MDBCardText>
            {plan.description}
            </MDBCardText>
            <MDBBtn onClick={handleViewSteps}>Zobacz</MDBBtn>
        </MDBCardBody>
        </MDBCard>
    </MDBCol>
)
};