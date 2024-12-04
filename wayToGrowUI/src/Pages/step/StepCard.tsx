import { MDBAccordionItem,
  MDBCheckbox
 } from "mdb-react-ui-kit";
  import { IStepWithID } from "../../App.interfaces";
  import { useParams } from "react-router-dom";
  import{ useState } from "react";

 
  
  interface StepCardProps {
      step: IStepWithID;  
  }
  
      
    
  export default function StepCard({step }: StepCardProps): React.ReactElement {
    
    // useEffect(() => {
    //   if (planId) {
    //   }
    // }, []); 

    const [checked, setChecked] = useState(false);


  return (
<MDBAccordionItem collapseId={step.order} headerTitle={<>
  <MDBCheckbox
        id='controlledCheckbox'
        checked={checked}
        onChange={() => setChecked(!checked)}
      /> &nbsp; &nbsp;  {step.title}</>}>
{step.subtitle}
</MDBAccordionItem>
  )
  };


  // <MDBListGroupItem tag='label'>
  //       <MDBCheckbox label={step.title} />
  //     </MDBListGroupItem>
  