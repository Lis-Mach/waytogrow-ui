interface IProps {
  email: number | undefined;
  deleteUser: () => void;
}

export default function UserDetails({
  email,
  deleteUser,
}: IProps): React.ReactElement {
  return (
    <div className="d-flex justify-space-between">
      <span>
        Email: {email}
      </span>
      <button onClick={deleteUser}>Usuń</button>
    </div>
  );
}
