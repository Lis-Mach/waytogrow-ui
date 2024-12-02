import { MDBRow } from "mdb-react-ui-kit";
import PlanCard  from "./PlanCard";
import { IPlanWithID } from "../../App.interfaces";

interface PlanCardListProps {
    plans: IPlanWithID[];  // Ensure 'plans' is an array of 'IPlanWithID'
}

export default function PlanCardList({plans }: PlanCardListProps): React.ReactElement {
    console.log(plans);
   

    return (
        <div>
            <MDBRow>
                {
                    plans.map(plan =>
                        <PlanCard key={plan.id} plan={plan}></PlanCard>
                    )
                }
            </MDBRow>
        </div>
    )
};