import { MDBRow } from "mdb-react-ui-kit";
import StepCard  from "./StepCard";
import { IStepWithID } from "../../App.interfaces";

interface StepCardListProps {
   steps: IStepWithID[];  // Ensure 'steps' is an array of 'IstepWithID'
}

export default function StepCardList({steps }: StepCardListProps): React.ReactElement {
    console.log(steps);
   

    return (
        <div>
            <MDBRow>
                {
                    steps.map(step =>
                        <StepCard key={step.order} step={step}></StepCard>
                    )
                }
            </MDBRow>
        </div>
    )
};
