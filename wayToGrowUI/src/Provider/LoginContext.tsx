import { createContext, PropsWithChildren, useContext } from "react";
import api from "../api";
import { useAuth } from "./authProvider";

interface ILogin {
  login: string;
  password: string;
}

const LoginContext = createContext<{
  logInFunction: (credentials: ILogin) => Promise<boolean>;
  logout: () => void;
}>({ logInFunction: async () => false, logout: () => {} });

export function LoginContextProvider({
  children,
}: PropsWithChildren): React.ReactElement {
  const { setToken } = useAuth();

  async function logInFunction(credentials: ILogin) {
    try {
      const response = await api.post("/login", credentials);
      console.log(response.data)
      setToken(response.data.data.accessToken);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
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
