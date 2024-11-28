import { useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/authProvider";

const PlanPage: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setToken(null); 
    navigate("/", { replace: true });
  };

  return <>My Plan page
  <button onClick={handleLogout}>Wyloguj</button>
  </>;
};

export default PlanPage;
