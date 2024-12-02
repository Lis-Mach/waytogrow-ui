import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/authProvider";
import useUserContext from "../../Provider/UserContext";
import usePlanContext from "../../Provider/PlanContext";

import React, { useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit";
import PlanCardList from "./PlanCardList";


export default function PlanPage(): React.ReactElement {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { getUser } = useUserContext();
  const {plans } = usePlanContext();

  async function handleLogout() {
    setToken(null);
    navigate("/", { replace: true });
  }

  useEffect(() => {
    getUser(); 
  }, []);

  return (
    <MDBContainer> 
      <MDBBtn onClick={handleLogout} className="ms-auto">
        Wyloguj
      </MDBBtn>
  <PlanCardList plans= {plans}/>
  </MDBContainer>
  );
}
