import { createContext, PropsWithChildren, useContext } from "react";
import api from "../api";
import { useAuth } from "./authProvider";
import { IUser, IUserWithID, UpdateUserPayload} from "../App.interfaces"

const UserContext = createContext<{
    signup: (userData: IUser) => Promise<boolean>;
    getUser: () => Promise<IUserWithID | undefined>;
    updateUser: (payload: UpdateUserPayload) => Promise<boolean>;
}>({ signup: async () => false, getUser: async () => undefined, updateUser: async () => false});


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

async function updateUser(payload: UpdateUserPayload) {
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
//   updateUser();
// }, []);

  return (
    <UserContext.Provider value={{ signup, getUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default function useUserContext() {
  return useContext(UserContext);
}
