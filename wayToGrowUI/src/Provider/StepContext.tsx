import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useReducer,
  } from "react";
  import stepReducer from "../Reducers/stepReducer";
  import api from "../api";
  import { IStep, IStepWithID } from "../App.interfaces";
  import { useAuth } from "../Provider/authProvider";

  const initialState: IStepWithID[] = [];


  const StepContext = createContext<{
    steps: IStepWithID[];
    addStep: (newPlan: IStep) => void;
    editStep: (id: number, editedPlan: IStep)=>void;
    deleteStep: (id: number) => void;
    getSteps: (planId: number) => void;
  }>({ steps: [], addStep: () => {}, editStep: () => {}, deleteStep: () => {},   getSteps: () => {}, });

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
  
    async function addStep(newStep: IStep) {
      try {
        const resposne = await api.post("/step", newStep);
        dispatch({ type: "ADD_STEP", payload: resposne.data });
      } catch (error) {
        console.error(error);
      }
    }

    function editStep(id: number, editedStep: IStep) {
        dispatch({ type: "EDIT_STEP", payload: { ...editedStep, id } });
      }
    
      async function deleteStep(id: number) {
        try {
          await api.delete(`/step/${id}`);
          dispatch({ type: "DELETE_STEP", payload: { id } });
        } catch (error) {
          console.error(error);
        }
      }
    
      async function getSteps(planId:number) {
        try {
          const response = await api<IStepWithID[]>(`plan/${planId}/step`);
          dispatch({ type: "SET_STEPS", payload: response.data.data });
        } catch (error) {
          console.error(error);
        }
      }
    
      useEffect(() => {
        if (state.length === 0) {
          console.log('No planId passed yet');
        }
      }, [state]);

      return (
        <StepContext.Provider value={{ steps: state, addStep, editStep, deleteStep, getSteps }}>
          {children}
        </StepContext.Provider>
      );
    }

    export default function useStepContext() {
        return useContext(StepContext);
      }