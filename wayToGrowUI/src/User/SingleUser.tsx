import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

interface IProps {}

export default function SingleUser({}: IProps): React.ReactElement | null {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUserWithID | undefined>(undefined);


  useEffect(() => {
    api.get<IUserWithID>(`/user/${id}`).then((response) => {
      setUser(response.data);
    });

    return () => {
      setUser(undefined);
    };
  }, [id]);

  if (!user) return <>Brak użytkownika</>;

  return (
    <div className="profile">
      <h1 className="profile__name">
        {user.name} {user.surname}
      </h1>
      <p className="profile__age">Login: {user.login}</p>
      <p className="profile__email">Email: {user.email?.join(", ")}</p>
    </div>
  );
}
