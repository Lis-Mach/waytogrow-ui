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

  const initialState: IStepWithID[] = [];


  const StepContext = createContext<{
    steps: IStepWithID[];
    addStep: (newPlan: IStep) => void;
    editStep: (id: number, editedPlan: IStep)=>void;
    deleteStep: (id: number) => void;
  }>({ steps: [], addStep: () => {}, editStep: () => {}, deleteStep: () => {} });

  export function StepContextProvider({
    children,
  }: PropsWithChildren): React.ReactElement {
    const [state, dispatch] = useReducer(stepReducer, initialState);
  
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
    
      async function getSteps() {
        try {
          const response = await api<IStepWithID[]>("/step");
          dispatch({ type: "SET_STEPS", payload: response.data });
        } catch (error) {
          console.error(error);
        }
      }
    
      useEffect(() => {
        getSteps();
      }, []);

      return (
        <StepContext.Provider value={{ steps: state, addStep, editStep, deleteStep }}>
          {children}
        </StepContext.Provider>
      );
    }

    export default function useStepContext() {
        return useContext(StepContext);
      }