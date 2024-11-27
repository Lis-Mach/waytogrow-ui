import { useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/authProvider";
import useLoginContext from "../Provider/LoginContext";

const Logout: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const {logout } = useLoginContext();

  async function handleLogout() {
    await logout();
    setToken(null); 
    navigate("/", { replace: true });
  };

  return <>Logout Page
  <button onClick={handleLogout}>Wyloguj</button>
  </>;
};

export default Logout;
