import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import stepReducer from "../reducers/stepReducer";
import api from "../api";
import { IStep, IStepWithID } from "../App.interfaces";
import { useAuth } from "./AuthProvider";

const initialState: IStepWithID[] = [];

const StepContext = createContext<{
  steps: IStepWithID[];
  addStep: (planId: number, newPlan: IStep) => Promise<number>;
  editStep: (planId: number, stepId: number, editedStep: IStep) => void;
  deleteStep: (planId: number, stepId: number) => void;
  getSteps: (planId: number) => void;
}>({
  steps: [],
  addStep: async () => 0,
  editStep: () => {},
  deleteStep: () => {},
  getSteps: () => {},
});

export function StepContextProvider({
  children,
}: PropsWithChildren): React.ReactElement {
  const [state, dispatch] = useReducer(stepReducer, initialState);
  const { token } = useAuth();
  
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  async function addStep( planId: number, newStep: IStep) {
    try {
      const resposne = await api.post(`/plan/${planId}/step`, newStep);
      dispatch({ type: "ADD_STEP", payload: resposne.data.data});
      return resposne.data.data.id
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  async function editStep(planId: number, id: number, editedStep: IStep) {
    try {
      await api.put(`plan/${planId}/step/${id}`, editedStep);
      dispatch({ type: "EDIT_STEP", payload: { ...editedStep, id } });
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteStep(planId: number, id: number) {
    try {
      await api.delete(`plan/${planId}/step/${id}`);
      dispatch({ type: "DELETE_STEP", payload: {  id } });
    } catch (error) {
      console.error(error);
    }
  }

  async function getSteps(planId: number) {
    try {
      const response = await api<IStepWithID[]>(`plan/${planId}/step`);
      dispatch({ type: "SET_STEPS", payload: response.data.data });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StepContext.Provider
      value={{ steps: state, addStep, editStep, deleteStep, getSteps }}
    >
      {children}
    </StepContext.Provider>
  );
}

export default function useStepContext() {
  return useContext(StepContext);
}
