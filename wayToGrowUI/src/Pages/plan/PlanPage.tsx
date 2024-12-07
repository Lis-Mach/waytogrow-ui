import usePlanContext from "../../providers/PlanContext";
import { MDBContainer } from "mdb-react-ui-kit";
import PlanCardList from "./PlanCardList";

function PlanPage(): React.ReactElement {
  const { plans } = usePlanContext();

  return (
    <MDBContainer>
      <PlanCardList plans={plans} />
    </MDBContainer>
  );
}

export default PlanPage;
