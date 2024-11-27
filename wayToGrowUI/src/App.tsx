import AuthProvider from "./Provider/authProvider";
import Routes from "./Routes";
import {IUser} from "./App.interface"

export default function App(): React.ReactElement {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

