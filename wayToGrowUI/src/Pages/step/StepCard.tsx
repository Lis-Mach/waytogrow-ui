import {
   
    MDBCol,
    MDBContainer,
    MDBRow
  } from "mdb-react-ui-kit";
  import { IStepWithID } from "../../App.interfaces";
 
  
  interface StepCardProps {
      step: IStepWithID;  
  }
  
      
    
  export default function StepCard({step }: StepCardProps): React.ReactElement {
    console.log(step);

  return (
 
 <MDBContainer md='12'>
      <MDBRow md='12'>
        <MDBCol  md='1'>
          order
        </MDBCol>
        <MDBCol  md='5'>
        {step.title}
        </MDBCol>
        <MDBCol md='5'>
        {step.subtitle}
        </MDBCol>
        <MDBCol md='1'>
        {step.description}
        </MDBCol>//bo to bedzie status done/not 
        
      </MDBRow>
    </MDBContainer>
  )
  };
