import User from "./User";
import { useCollapse } from "../hooks/useCollapse";
import { useFilteredCollection } from "../hooks/useFilteredCollection";
import useUserContext from "../UserContext";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function UserList(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { user, deleteUser } = useUserContext();

  const { activeIndex, setActive } = useCollapse();

  const { filteredCollection, search, setSearch } = useFilteredCollection(
    user,
    "firstName"
  );

  return (
    <div className="d-flex align-items-start">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Szukaj..."
          value={search}
          className="input"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-col-3 mb-1">
          <span>Imię</span>
          <span>Nazwisko</span>
          <span>Login</span>
          {/* <span>Email</span> */}
        </div>
        {filteredCollection.map((user, index) => (
          <User
            key={user.id}
            user={user}
            isActive={index === activeIndex}
            onClick={() => setActive(index)}
            deleteUser={() => {
              deleteUser(user.id);
              setActive(undefined);
              if (user.id === Number(id)) navigate("/users");
            }}
          />
        ))}
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
