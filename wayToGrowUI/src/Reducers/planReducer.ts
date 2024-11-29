import { IPlanWithID } from "../App.interfaces";
type ACTION =
  | { type: "SET_PLANS"; payload: IPlanWithID[] }
  | { type: "ADD_PLAN"; payload: IPlanWithID }
  | { type: "EDIT_PLAN"; payload: IPlanWithID }
  | { type: "DELETE_PLAN"; payload: { id: number } };

export default function planReducer(state: IPlanWithID[], action: ACTION) {
  switch (action.type) {
    case "SET_PLANS":
      return action.payload;
    case "ADD_PLAN":
      return [...state, action.payload];
    case "EDIT_PLAN":
      return state.map((plan) =>
        plan.id === action.payload.id ? action.payload : plan
      );
    case "DELETE_PLAN":
      return state.filter((plan) => plan.id !== action.payload.id);
    default:
      throw new Error();
  }
}
