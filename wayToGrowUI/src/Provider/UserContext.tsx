import { createContext, PropsWithChildren, useContext } from "react";
import api from "../api";
import { useAuth } from "./authProvider";
import { IUser} from "../App.interfaces"
import { AxiosError } from "axios";

const UserContext = createContext<{
    signup: (userData: IUser) => Promise<boolean>;
}>({ signup: async () => false });

export function UserContextProvider({
  children,
}: PropsWithChildren): React.ReactElement {
  const { setToken } = useAuth();

  async function signup(userData: IUser): Promise<boolean> {
    return api.post("/signup", userData)
        .then(function (response) {
        console.log(response.data)
        setToken(response.data.data.accessToken);
        return true;
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(error.response.data.error.message)
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


  return (
    <UserContext.Provider value={{ signup }}>
      {children}
    </UserContext.Provider>
  );
}

export default function useUserContext() {
  return useContext(UserContext);
}
