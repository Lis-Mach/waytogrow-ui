import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import planReducer from "../Reducers/planReducer";
import api from "../api";
import { IPlan, IPlanWithID } from "../App.interfaces";

const initialState: IPlanWithID[] = [];

const PlanContext = createContext<{
  plans: IPlanWithID[];
  addPlan: (newPlan: IPlan) => void;
  editPlan: (id: number, editedPlan: IPlan) => void;
  deletePlan: (id: number) => void;
}>({ plans: [], addPlan: () => {}, editPlan: () => {}, deletePlan: () => {} });

export function PlanContextProvider({
  children,
}: PropsWithChildren): React.ReactElement {
  const [state, dispatch] = useReducer(planReducer, initialState);

  async function addPlan(newPlan: IPlan) {
    try {
      const resposne = await api.post("/plan", newPlan);
      dispatch({ type: "ADD_PLAN", payload: resposne.data });
    } catch (error) {
      console.error(error);
    }
  }

  function editPlan(id: number, editedPlan: IPlan) {
    dispatch({ type: "EDIT_PLAN", payload: { ...editedPlan, id } });
  }

  async function deletePlan(id: number) {
    try {
      await api.delete(`/plan/${id}`);
      dispatch({ type: "DELETE_PLAN", payload: { id } });
    } catch (error) {
      console.error(error);
    }
  }

  async function getPlans() {
    try {
      const response = await api<IPlanWithID[]>("/plan");
      dispatch({ type: "SET_PLANS", payload: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <PlanContext.Provider
      value={{ plans: state, addPlan, editPlan, deletePlan }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export default function usePlanContext() {
  return useContext(PlanContext);
}
