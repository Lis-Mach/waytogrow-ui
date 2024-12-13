import AuthProvider from "./providers/AuthProvider";
import Routes from "./routes";
import { IUser } from "./App.interface";

export default function App(): React.ReactElement {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
