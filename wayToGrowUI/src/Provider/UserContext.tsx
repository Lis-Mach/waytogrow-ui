import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import api from "../api";
import { IUserWithID } from "../App.interfaces"
import { useAuth } from "../Provider/authProvider";

const UserContext = createContext<{
    getUser: () => Promise<IUserWithID | undefined>;
    updateUser: (payload: IUserWithID) => Promise<boolean>;
}>({ getUser: async () => undefined, updateUser: async () => false});


export function UserContextProvider({
  children,
}: PropsWithChildren): React.ReactElement {
  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

async function getUser(): Promise<IUserWithID | undefined> {
    return api.get("/user")
        .then(function (response) {
        console.log(response.data.data)
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
          console.log('Error', error.message);
        }
        console.log(error.config);
        return undefined;
      })
}

async function updateUser(payload: IUserWithID) {
  return api.put("/user", payload)
      .then(function (response) {
      console.log(response.data)
      return true;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(error.response?.data?.error?.message)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
       return false;
    })
}

// useEffect(() => {
//   getUser();
// }, []);

  return (
    <UserContext.Provider value={{ getUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default function useUserContext() {
  return useContext(UserContext);
}
