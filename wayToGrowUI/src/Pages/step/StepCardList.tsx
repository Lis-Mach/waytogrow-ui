import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import StepCard from "./StepCard";
import { IStepWithID } from "../../App.interfaces";

interface StepCardListProps {
  steps: IStepWithID[]; // Ensure 'steps' is an array of 'IstepWithID'
  updateStep: (updatedStep: IStepWithID) => void;
}

export default function StepCardList({
  steps,
  updateStep,
}: StepCardListProps): React.ReactElement {
  console.log(steps);

  return (
    <div className="table-responsive" style={{ maxHeight: "60lvh" }}>
      <MDBTable align="middle" className="table table-striped">
        <MDBTableHead className="table-dark sticky-top">
          <tr>
            <th scope="col">Tytuł</th>
            <th scope="col">Opis</th>
            <th scope="col">Status</th>
            <th scope="col">Akcja</th>
          </tr>
        </MDBTableHead>

        <MDBTableBody className="scrollable-body">
          {steps.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              updateStep={updateStep}
            />
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
