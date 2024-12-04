import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import api from "../api";

// Define the type for the context value
interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
}

// Create the context with a default value (null as placeholder)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (token: string | null) => {
    setToken_(token)
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = "Bearer " + token;
      api.defaults.headers.post['Content-Type'] = 'application/json';
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
    console.log('Axios default headers:', api.defaults.headers);

  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo<AuthContextType>(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
