
import useUserContext from "../../Provider/UserContext";
import usePlanContext from "../../Provider/PlanContext";

import React, { useEffect } from "react";
import {
  MDBContainer,
} from "mdb-react-ui-kit";
import PlanCardList from "./PlanCardList";




 function PlanPage(): React.ReactElement {
  const { getUser } = useUserContext();
  const {plans } = usePlanContext();

  // TODO: wywalic?
  useEffect(() => {
    getUser(); 
  }, []);
  


  return (
    <MDBContainer> 
      
  <PlanCardList plans= {plans}/>
  </MDBContainer>
  );
}

export default PlanPage;