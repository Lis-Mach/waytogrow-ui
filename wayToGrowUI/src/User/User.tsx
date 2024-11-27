import { Link } from "react-router-dom";
import UserDetails from "./UserDetails";
import "./user.scss";
interface IProps {
  user: IUserWithID;
  isActive: boolean;
  onClick: () => void;
  deleteUser: () => void;
}

export default function User({
  user,
  isActive,
  onClick,
  deleteUser,
}: IProps): React.ReactElement {
  const { id, name, surname, login, email } = user;

  if (!name && !surname) {
    return <>Brak danych</>;
  }

  return (
    <div className="user">
      <div className="grid grid-col-3">
        <span onClick={onClick}>{name ? name : "- -"}</span>
        <span onClick={onClick}>{surname && <strong>{surname}</strong>}</span>
        <span onClick={onClick}>{login ? login : "- -"}</span>
        <span onClick={onClick}>{email ? email : "- -"}</span>
        <Link to={`${id}`}>Profil</Link>
      </div>
      {/* {isActive && <UserDetails deleteUser={deleteUser} />} */}
    </div>
  );
}
