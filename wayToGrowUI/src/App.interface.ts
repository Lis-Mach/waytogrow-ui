interface IUser {
  name: string | undefined;
  surname: string | undefined;
  login: string | undefined;
  email: string[] | undefined;
}

 interface IUserWithID extends IUser {
  id: number;
}

interface ILogin {
  login: string | undefined; 
  password: string | undefined; 
}


