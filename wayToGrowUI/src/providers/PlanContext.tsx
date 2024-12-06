import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import planReducer from "../reducers/PlanReducer";
import api from "../api";
import { IPlan, IPlanWithID } from "../App.interfaces";
import { useAuth } from "./AuthProvider";

const initialState: IPlanWithID[] = [];

const emptyPlan = {
  title: "",
  subtitle: "",
  id: 0,
};

const PlanContext = createContext<{
  plans: IPlanWithID[];
  addPlan: (newPlan: IPlan) => void;
  editPlan: (id: number, editedPlan: IPlan) => void;
  deletePlan: (id: number) => void;
  getPlanImage: (id: number) => Promise<string | undefined>;
}>({
  plans: [],
  addPlan: () => {},
  editPlan: () => {},
  deletePlan: () => {},
  getPlanImage: async () => undefined,
});

export function PlanContextProvider({
  children,
}: PropsWithChildren): React.ReactElement {
  const [state, dispatch] = useReducer(planReducer, initialState);
  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  async function addPlan(newPlan: IPlan) {
    try {
      const resposne = await api.post("/plan", newPlan);
      dispatch({ type: "ADD_PLAN", payload: resposne.data });
    } catch (error) {
      console.error(error);
    }
  }

  async function editPlan(id: number, editedPlan: IPlan) {
    try {
      await api.put(`/plan/${id}`, editedPlan);
      dispatch({ type: "EDIT_PLAN", payload: { ...editedPlan, id } });
    } catch (error) {
      console.error(error);
    }
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
      dispatch({ type: "SET_PLANS", payload: response.data.data });
    } catch (error) {
      console.error(error);
    }
  }

  async function getPlanImage(id: number) {
    try {
      const response = await api.get(`/plan/${id}/image`, {
        responseType: "blob",
      });

      // Check if the response is a Blob and create an object URL
      if (response.data instanceof Blob) {
        return URL.createObjectURL(response.data);
      } else {
        throw new Error("Response is not a valid Blob.");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      return undefined;
    }
  }

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <PlanContext.Provider
      value={{ plans: state, addPlan, editPlan, deletePlan, getPlanImage }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export default function usePlanContext() {
  return useContext(PlanContext);
}
