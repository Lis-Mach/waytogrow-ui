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

interface PlanCardProps {
    plans: IPlanWithID;  
}

export default function PlanCard({plan }: PlanCardProps): React.ReactElement {
    const {getPlanImage} = usePlanContext();

    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)
    
    useEffect(() => {
        // Fetch the image URL for this plan
        const fetchImage = async () => {
          const imageUrl = await getPlanImage(plan.id);
          setImageSrc(imageUrl);
        };
    
        fetchImage();
      }, [plan.id, getPlanImage]);

return (
<MDBCol  md='4'>
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
            <MDBBtn href="#">Button</MDBBtn>
        </MDBCardBody>
        </MDBCard>
    </MDBCol>
)
};