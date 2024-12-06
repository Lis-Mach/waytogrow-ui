import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../api";
import { IUserWithID } from "../App.interfaces";
import { useAuth } from "./AuthProvider";

const emptyUser = {
  login: "",
  password: "",
  name: "",
  surname: "",
  email: "",
  id: 0,
};

const UserContext = createContext<{
  user: IUserWithID;
  getUser: () => Promise<IUserWithID>;
  updateUser: (payload: IUserWithID) => Promise<boolean>;
}>({
  user: emptyUser,
  getUser: async () => emptyUser,
  updateUser: async () => false,
});

export function UserContextProvider({
  children,
}: PropsWithChildren): React.ReactElement {
  const { token } = useAuth();
  const [user, setUser] = useState<IUserWithID>(emptyUser);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  async function getUser(): Promise<IUserWithID> {
    return api
      .get("/user")
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // alert(error.response.data.error.message)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  async function updateUser(payload: IUserWithID) {
    return api
      .put("/user", payload)
      .then(function (response) {
        console.log(response.data);
        return true;
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(error.response?.data?.error?.message);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
        return false;
      });
  }

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      setUser(fetchedUser); // Set user state when fetched
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default function useUserContext() {
  return useContext(UserContext);
}
