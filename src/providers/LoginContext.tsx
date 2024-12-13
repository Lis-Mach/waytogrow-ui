import { createContext, PropsWithChildren, useContext } from "react";
import api from "../api";
import { useAuth } from "./AuthProvider";
import { ILogin } from "../App.interfaces";

const LoginContext = createContext<{
  logInFunction: (credentials: ILogin) => Promise<boolean>;
  logout: () => void;
}>({ logInFunction: async () => false, logout: () => {} });

export function LoginContextProvider({
  children,
}: PropsWithChildren): React.ReactElement {
  const { setToken } = useAuth();

  async function logInFunction(credentials: ILogin) {
    return await api
      .post("/login", credentials)
      .then(function (response) {
        console.log(response.data);
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
          alert(error.response.data.error.message);
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

  async function logout() {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <LoginContext.Provider value={{ logInFunction, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

export default function useLoginContext() {
  return useContext(LoginContext);
}
