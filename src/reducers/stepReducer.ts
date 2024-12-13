import { IStepWithID } from "../App.interfaces";



type ACTION =
  | { type: "SET_STEPS"; payload: IStepWithID[] }
  | { type: "ADD_STEP"; payload: IStepWithID }
  | { type: "EDIT_STEP"; payload: IStepWithID }
  | { type: "DELETE_STEP"; payload: { id: number } };

export default function stepReducer(state: IStepWithID[], action: ACTION) {
  switch (action.type) {
    case "SET_STEPS":
      return action.payload;
    case "ADD_STEP":
      return [...state, action.payload];
    case "EDIT_STEP":
      return state.map((step) =>
        step.id === action.payload.id ? action.payload : step
      );
    case "DELETE_STEP":
      return state.filter((step) => step.id !== action.payload.id);
    default:
      throw new Error();
  }
}
